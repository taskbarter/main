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

  refreshData = (id) => {
    this.props.fetchWork(id).then((fetched_work) => {
      this.setState(
        {
          work: fetched_work,
          loading: false,
          task: fetched_work.work_data.length
            ? fetched_work.work_data[0].taskDetails[0]
            : [],
        },
        () => {
          let status = this.getLatestStatus();
          if (status === 3) {
            this.props.getCurrentProfile();
          }
          this.setState({
            last_status: status,
          });
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
    if (this.state.task.length === 0) {
      return (
        <div className='taskv-loader error-msg-center'>
          You are not allowed to view this page.
        </div>
      );
    }
    const task = this.state.task;
    const assignee = this.state.work.work_data[0].assignee[0];
    const assignedTo = this.state.work.work_data[0].assignedTo[0];
    const task_updates = this.state.work.work_data[0].taskUpdates;
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
              />
            </div>
            <div className='col-md-8 order-md-1'>
              <div className='card card-body mb-2 dt-header'>
                <div className='dt-sub-title'>I want someone to</div>
                <div className='dt-title dv-title'>{task.headline}</div>
                <div className='dt-added-on'>
                  Posted{' '}
                  <span className='dt-date'>{moment(task.date).fromNow()}</span>{' '}
                  by {assignee.first_name} {assignee.second_name}
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
                <div className='tu-heading'>Task Updates</div>
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
})(Work);
