import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTasks } from '../../actions/taskAction';
import { getTasksCount } from '../../actions/taskAction';
import { getCurrentProfile } from '../../actions/profileAction';
import moment from 'moment';
import {
  toggleLike,
  doExplore,
  sendProposal,
  fetchTask,
  fetchWork,
  fetchProposals,
  changeProposalState,
  sendWorkUpdate,
  submitFeedback,
} from '../../actions/taskAction';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { Input } from 'reactstrap';
import '../../style/task.css';
import TLoader from '../utils/TLoader';
import 'quill/dist/quill.snow.css';
import HeaderOnlyLogo from '../layout/HeaderOnlyLogo';
import DescriptionEditor from '../task/subs/DescriptionEditor';
import WorkAction from './subs/WorkAction';
import TaskUpdateItem from './subs/TaskUpdateItem';
import { createConnection } from '../../actions/socketActions';
import FeedbackForm from './subs/FeedbackForm';
import FeedbackUpdateCard from './subs/FeedbackUpdateCard';
import MetaTags from 'react-meta-tags';

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_task: 0,
      proposal_popup_is_open: false,
      proposallist_popup_is_open: false,
      proposal_text: '',
      proposal_loading: false,
      loading: true,
      task: {},
      proposals: [],

      quillObj: {},
      description: '',

      sending_state: false,
      submitting_state: false,

      last_status: 0,

      is_feedback_allowed: false,

      feedback_popup_is_open: false,
      feedback_stars: 0,
      feedback_text: '',
      feedback_submitting_state: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState(
      {
        selected_task: id,
        loading: true,
      },
      this.refreshData(id)
    );
    this.waitForSocket();
  }

  waitForSocket = async () => {
    if (!this.props.socket_connection.id) {
      await this.props.createConnection(this.props.auth);
    }

    this.props.socket_connection.on('refresh_work_page', (data) => {
      if (data.work_id === this.state.selected_task) {
        this.refreshData(this.state.selected_task);
      }
    });
  };

  feedback_toggle = () => {
    this.setState({
      feedback_popup_is_open: !this.state.feedback_popup_is_open,
    });
  };

  onFeedbackStarChange = (d) => {
    this.setState({
      feedback_stars: d,
    });
  };
  onFeedbackTextChange = (t) => {
    this.setState({
      feedback_text: t.target.value,
    });
  };
  onFeedbackSubmit = () => {
    const f_b = {
      work_id: this.state.selected_task,
      text: this.state.feedback_text,
      rating: this.state.feedback_stars,
    };
    this.setState(
      {
        feedback_submitting_state: true,
      },
      () => {
        this.props.submitFeedback(f_b).then(() => {
          this.setState({
            feedback_popup_is_open: false,
          });
          this.refreshData(this.state.selected_task);
        });
      }
    );
  };
  checkIfFeedbackPending = () => {
    const { work } = this.state;
    const current_feedback = work.work_data[0].feedback;
    if (
      this.getLatestStatus() === 3 &&
      (!current_feedback.length ||
        !(
          (current_feedback[0] &&
            current_feedback[0].from === this.props.auth.user.id) ||
          (current_feedback[1] &&
            current_feedback[1].from === this.props.auth.user.id)
        ))
    ) {
      this.setState({
        is_feedback_allowed: true,
        feedback_popup_is_open: true,
      });
    } else {
      this.setState({
        is_feedback_allowed: false,
        feedback_popup_is_open: false,
      });
    }
  };
  /*
  if status = Completed {
    if feedback not exists {
      valid
    } 
    else{ 
      if((feedback[0].from = cu) or (feedback[1].from = cu)){
        invalid
      }
    }
  }
*/
  refreshData = (id) => {
    this.props.fetchWork(id).then((fetched_work) => {
      const isValid = fetched_work
        ? fetched_work.work_data.length
          ? fetched_work.work_data[0].taskDetails[0]
            ? true
            : false
          : false
        : false;
      this.setState(
        {
          work: fetched_work,
          loading: false,
          task: isValid ? fetched_work.work_data[0].taskDetails[0] : [],
          isValid: isValid,
        },
        () => {
          if (this.state.isValid) {
            let status = this.getLatestStatus();
            if (status === 3) {
              this.props.getCurrentProfile();
            }
            this.setState({
              last_status: status,
            });

            this.checkIfFeedbackPending();
          }
        }
      );
    });
  };

  onAssignQuillObj = (quillObj) => {
    this.setState({
      quillObj: quillObj,
    });
  };

  onSendUpdate = async () => {
    if (this.state.quillObj.getText().trim() === '') {
      return false;
    }
    this.state.quillObj.enable(false);
    this.setState(
      {
        sending_state: true,
      },
      async () => {
        const obj = {
          work_id: this.state.selected_task,
          text: this.state.quillObj.root.innerHTML,
          type: 0,
        };
        await this.props.sendWorkUpdate(obj);
        this.refreshData(this.state.selected_task);
        this.state.quillObj.enable(true);
        this.state.quillObj.setText('');
        this.setState({
          sending_state: false,
        });
      }
    );
  };

  onSubmitWork = (e, new_type = 1) => {
    this.setState(
      {
        submitting_state: true,
      },
      async () => {
        const obj = {
          work_id: this.state.selected_task,
          text: '',
          type: new_type,
        };
        await this.props.sendWorkUpdate(obj);
        this.refreshData(this.state.selected_task);
        this.setState({
          submitting_state: false,
        });
      }
    );
  };

  onRejectWork = (e) => {
    this.onSubmitWork(e, 2);
  };

  onAcceptWork = (e) => {
    this.onSubmitWork(e, 3);
  };

  getLatestStatus = () => {
    let temp_status = 0;
    let arr = this.state.work.work_data[0].taskUpdates;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].type !== 0) {
        temp_status = arr[i].type;
      }
    }
    return temp_status;
  };

  render() {
    if (this.state.loading) {
      return (
        <div className='taskv-loader'>
          <TLoader colored={true} />
        </div>
      );
    }
    if (!this.state.task || this.state.task.length === 0) {
      return (
        <div className='taskv-loader error-msg-center'>
          You are not allowed to view this page.
          <Link className='clear-a mt-4' to='/'>
            <button className='btn btn-primary btn-sm'>Go back</button>
          </Link>
        </div>
      );
    }
    const task = this.state.task;
    const assignee = this.state.work.work_data[0].assignee[0];
    const assignedTo = this.state.work.work_data[0].assignedTo[0];
    const task_updates = this.state.work.work_data[0].taskUpdates;
    const feedbacks = this.state.work.work_data[0].feedback;
    return (
      <React.Fragment>
        <main role='main' className='container mt-4 mb-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2 sticky-columns'>
              <WorkAction
                current_user={this.props.auth.user.id}
                assignee={assignee}
                assignedTo={assignedTo}
                onSubmitWork={this.onSubmitWork}
                submitting_state={this.state.submitting_state}
                last_status={this.state.last_status}
                onRejectWork={this.onRejectWork}
                onAcceptWork={this.onAcceptWork}
                isFeedbackAllowed={this.state.is_feedback_allowed}
                feedback_toggle={this.feedback_toggle}
                task_points={task.taskpoints}
              />
            </div>
            <div className='col-md-8 order-md-1'>
              <div className='card card-body mb-2 dt-header'>
                <div className='dt-sub-title'>I want someone to</div>
                <div className='dt-title dv-title'>{task.headline}</div>
                <div className='dt-added-on'>
                  Posted{' '}
                  <span className='dt-date'>{moment(task.date).fromNow()}</span>{' '}
                  by {assignee.first_name} {assignee.second_name} |{' '}
                  <strong>{task.taskpoints}</strong> Pts
                </div>

                <div className='mt-3'>
                  <div className='task-list-title dt-title'>Description</div>
                  <div className='mb-2 mt-1 ql-editor dt-description'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: task.description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <div className='tu-heading mt-3'>Task Updates</div>
                {task_updates.map((task_update, id) => {
                  return (
                    <div key={id}>
                      <TaskUpdateItem
                        task_update={task_update}
                        assignee={assignee}
                        assignedTo={assignedTo}
                        task_points={task.taskpoints}
                        current_user={this.props.auth.user.id}
                      />
                    </div>
                  );
                })}
                {feedbacks.map((feedback, id) => {
                  return (
                    <div key={id}>
                      <FeedbackUpdateCard
                        feedback={feedback}
                        assignee={assignee}
                        assignedTo={assignedTo}
                        current_user={this.props.auth.user.id}
                      />
                    </div>
                  );
                })}
              </div>
              {this.state.last_status !== 3 ? (
                <div className=''>
                  <div className='tu-heading'>Post an Update</div>
                  <DescriptionEditor
                    placeholder='Type in the latest update for the task.'
                    onAssignQuillObj={this.onAssignQuillObj}
                    disabled={this.state.sending_state}
                  />
                  <div className='tu-info'>
                    To attach files, please use a cloud service such as DropBox
                    or Google Drive and use their link in the update.
                  </div>
                  <button
                    disabled={this.state.sending_state}
                    className='btn btn-primary tu-btn'
                    onClick={this.onSendUpdate}
                  >
                    {this.state.sending_state ? 'Posting...' : 'Post'}
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </main>
        <FeedbackForm
          modal={this.state.feedback_popup_is_open}
          toggle={this.feedback_toggle}
          work={this.state.work.work_data[0]}
          onFeedbackStarChange={this.onFeedbackStarChange}
          onFeedbackTextChange={this.onFeedbackTextChange}
          feedback_text={this.state.feedback_text}
          feedback_stars={this.state.feedback_stars}
          onFeedbackSubmit={this.onFeedbackSubmit}
          feedback_submitting_state={this.state.feedback_submitting_state}
        />

        <MetaTags>
          <title>Work of '{task.headline}' | Taskbarter</title>
        </MetaTags>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.task,
  auth: state.auth,
  socket_connection: state.socket.socket_connection,
});

export default connect(mapStateToProps, {
  getAllTasks,
  toggleLike,
  getTasksCount,
  doExplore,
  fetchTask,
  sendProposal,
  fetchProposals,
  changeProposalState,
  fetchWork,
  sendWorkUpdate,
  createConnection,
  getCurrentProfile,
  submitFeedback,
})(Work);
