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
import DescriptionEditor from '../task/subs/DescriptionEditor';
import WorkAction from './subs/WorkAction';

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

  onAssignQuillObj = (quillObj) => {
    this.setState({
      quillObj: quillObj,
    });
  };

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
        <main role='main' className='container mt-4 mb-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <WorkAction current_user={this.props.auth.user.id} />
            </div>
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
              <div className=''>
                <div className='tu-heading'>Post an Update</div>
                <DescriptionEditor
                  placeholder='Type in the latest update for the task.'
                  onAssignQuillObj={this.onAssignQuillObj}
                />
                <div className='tu-info'>
                  To attach files, please use a cloud service such as DropBox or
                  Google Drive and use their link in the update.
                </div>
                <button className='btn btn-primary tu-btn'>Post</button>
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
