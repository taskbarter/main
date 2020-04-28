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
  changeProposalState,
} from '../../actions/taskAction';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { Input } from 'reactstrap';
import '../../style/task.css';
import TLoader from '../utils/TLoader';
import 'quill/dist/quill.snow.css';
import HeaderOnlyLogo from '../layout/HeaderOnlyLogo';

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

  onChangeProposalState = (prop_id, new_state) => {
    this.props.changeProposalState(prop_id, new_state).then(() => {
      this.props.fetchProposals(this.state.selected_task).then((proposals) => {
        this.setState({
          proposals: proposals.proposal_data,
        });
      });
    });
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
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'></div>
            <div className='col-md-8 order-md-1'>
              <div className='card card-body mb-2 dt-header'>
                <div className='dt-sub-title'>I want someone to</div>
                <div className='dt-title dv-title'>{task.headline}</div>
                <div className='dt-added-on'>
                  Posted{' '}
                  <span className='dt-date'>{moment(task.date).fromNow()}</span>{' '}
                  by {task.userdetails[0].first_name}{' '}
                  {task.userdetails[0].second_name}
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
})(Work);
