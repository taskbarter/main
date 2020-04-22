import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTasks } from '../../actions/taskAction';
import { getTasksCount } from '../../actions/taskAction';
import moment from 'moment';
import {
  toggleLike,
  doExplore,
  sendProposal,
  fetchTask,
  fetchProposals,
} from '../../actions/taskAction';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { Input } from 'reactstrap';
import '../../style/task.css';
import TLoader from '../utils/TLoader';
import ProposalForm from '../explore/subs/ProposalForm';
import 'quill/dist/quill.snow.css';
import TaskAction from './subs/TaskAction';
import HeaderOnlyLogo from '../layout/HeaderOnlyLogo';
import ProposalList from './subs/ProposalList';

class TaskMain extends Component {
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
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState(
      {
        selected_task: id,
        loading: true,
      },
      () => {
        this.props.fetchTask(id).then((fetched_task) => {
          this.setState({
            task: fetched_task,
            loading: false,
          });
          if (this.props.auth.user.id === fetched_task.taskData[0].user) {
            this.props.fetchProposals(id).then((proposals) => {
              this.setState({
                proposals: proposals.proposal_data,
              });
            });
          }
        });
      }
    );
  }

  proposal_toggle = () => {
    this.setState({
      proposal_popup_is_open: !this.state.proposal_popup_is_open,
    });
  };

  proposallist_toggle = () => {
    this.setState({
      proposallist_popup_is_open: !this.state.proposallist_popup_is_open,
    });
  };

  changeProposalText = (t) => {
    if (t) {
      this.setState({
        proposal_text: t.target.value,
      });
    } else {
      this.setState({
        proposal_text: '',
      });
    }
  };

  sendProposal = () => {
    const payload = {
      text: this.state.proposal_text,
      task_id: this.state.selected_task,
    };
    this.setState(
      {
        proposal_loading: true,
      },
      () => {
        this.props.sendProposal(payload).then(() => {
          this.setState({
            proposal_popup_is_open: false,
            proposal_text: '',
            proposal_loading: false,
          });
        });
      }
    );
  };

  skillsbadges2 = (skills) => {
    if (skills) {
      let fsix = skills;
      console.log(fsix);
      return fsix.map((skl, i) => (
        <div className='profile-skills dt-skills' key={i}>
          {skl}
        </div>
      ));
    }
  };

  skillSection = () => (
    <div className='profile-badge-categories'>
      {this.skillsbadges2(this.state.task.taskData[0].skills)}
    </div>
  );

  render() {
    if (this.state.loading) {
      return (
        <div className='taskv-loader'>
          <TLoader colored={true} />
        </div>
      );
    }
    const task = this.state.task.taskData[0];
    return (
      <React.Fragment>
        {this.props.auth.user ? <HeaderOnlyLogo /> : ''}
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <TaskAction
                task_owner={task.user}
                current_user={this.props.auth.user.id}
                proposals={this.state.proposals}
                proposallist_toggle={this.proposallist_toggle}
                proposalform_toggle={this.proposal_toggle}
              />
            </div>
            <div className='col-md-8 order-md-1'>
              <div className='card card-body mb-2 dt-header'>
                <div className='dt-sub-title'>I want someone to</div>
                <div className='dt-title dv-title'>{task.headline}</div>
                <div className='dt-added-on'>
                  Posted{' '}
                  <span className='dt-date'>{moment(task.date).fromNow()}</span>{' '}
                  • 0 applicants
                </div>

                <div className='mt-3'>
                  <div className='task-list-title dt-title'>Reward</div>
                  <div className='mb-2'>
                    You will earn{' '}
                    <span className='dt-points'>{task.taskpoints} points</span>
                  </div>
                  <div className='task-list-title dt-title'>Category</div>
                  <div className='mb-2'>{task.category}</div>
                  <div className='task-list-title dt-title mb-1'>Skills</div>
                  <div className='mb-2 mt-1'>
                    <div className='profile-badge-categories'>
                      {this.state.task.taskData[0].skills.map((skl, i) => {
                        return (
                          <div className='profile-skills dt-skills' key={i}>
                            {skl}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className='task-list-title dt-title'>Description</div>
                  <div className='mb-2 mt-1 ql-editor dt-description'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: task.description,
                      }}
                    ></div>
                  </div>
                  <div className='task-list-title dt-title'>Posted By</div>
                  {task.userdetails && task.userdetails[0] ? (
                    <div className='mb-2'>
                      <span className='dt-points'>
                        {task.userdetails[0].first_name}{' '}
                        {task.userdetails[0].second_name}
                      </span>
                      <div className='dt-added-on'>
                        Member since{' '}
                        <span className='dt-date'>
                          {moment(task.userdetails[0].memberSince).years()}
                        </span>{' '}
                        • {task.userdetails[0].location}
                      </div>
                    </div>
                  ) : (
                    <div className='mb-2'>Hidden</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <ProposalForm
          toggle={this.proposal_toggle}
          modal={this.state.proposal_popup_is_open}
          selected_task={this.state.selected_task}
          proposal_text={this.state.proposal_text}
          changeProposalText={this.changeProposalText}
          sendProposal={this.sendProposal}
          proposalLoading={this.state.proposal_loading}
        />
        <ProposalList
          modal={this.state.proposallist_popup_is_open}
          toggle={this.proposallist_toggle}
          proposals={this.state.proposals}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.task,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllTasks,
  toggleLike,
  getTasksCount,
  doExplore,
  fetchTask,
  sendProposal,
  fetchProposals,
})(TaskMain);
