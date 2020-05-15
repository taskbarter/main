import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import {
  fetchMyAvailableTasks,
  fetchCompletedTasks,
  fetchArchivedTasks,
  fetchAssignedTasks,
  fetchPausedTasks,
  fetchTask,
  fetchProposals,
  deleteTask,
  changeProposalState,
} from '../../actions/taskAction';
import classnames from 'classnames';
import { connect } from 'react-redux';
import MyTasksTabs from './subs/MyTasksTabs';
import MyTasksTable from './subs/MyTasksTable';
import ProposalList from './subs/ProposalList';
import DeleteTask from './subs/DeleteTask';
import MetaTags from 'react-meta-tags';

class MyTasks extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: '1',
      proposallist_popup_is_open: false,
      deletetask_popup_is_open: false,
      deleteTaskID: 0,
      proposals: [],
      selected_task: 0,
      task: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      if (id == 0) {
        this.setState({ selectedTab: 1 }, () => this.onTabChange(1));
      } else if (id == 1) {
        this.setState({ selectedTab: 4 }, () => this.onTabChange(4));
      } else if (id == 2) {
        this.setState({ selectedTab: 3 }, () => this.onTabChange(3));
      } else if (id == 3) {
        this.setState({ selectedTab: 5 }, () => this.onTabChange(5));
      } else if (id == 4) {
        this.setState({ selectedTab: 2 }, () => this.onTabChange(2));
      }
    }
    this.props.fetchMyAvailableTasks();
  }
  onTabChange = (tab) => {
    if (tab !== this.state.selectedTab) this.setState({ selectedTab: tab });
    if (tab == '1') this.props.fetchMyAvailableTasks();
    else if (tab == '2') this.props.fetchAssignedTasks();
    else if (tab == '3') this.props.fetchPausedTasks();
    else if (tab == '4') this.props.fetchCompletedTasks();
    else if (tab == '5') this.props.fetchArchivedTasks();
  };

  proposallist_toggle = () => {
    this.setState({
      proposallist_popup_is_open: !this.state.proposallist_popup_is_open,
    });
  };
  deleteTask_toggle = () => {
    this.setState({
      deletetask_popup_is_open: !this.state.deletetask_popup_is_open,
    });
  };
  setProposal = (task) => {
    this.setState(
      {
        task: task,
        loading: true,
        selected_task: task._id,
      },
      () => {
        if (this.props.auth.user.id === task.user) {
          this.props.fetchProposals(task._id).then((proposals) => {
            this.setState({
              proposals: proposals.proposal_data,
            });
          });
        }
      }
    );
    this.proposallist_toggle();
  };

  onDeleteTask = (id) => {
    this.setState({
      deleteTaskID: id,
      deletetask_popup_is_open: true,
    });
  };
  closeDeleteTaskPopup = () => {
    this.setState({
      deletetask_popup_is_open: false,
    });
  };
  deleteTaskFromPopup = () => {
    this.props.deleteTask(this.state.deleteTaskID);
    this.onTabChange(this.state.selectedTab);
  };

  onChangeProposalState = (prop_id, new_state) => {
    this.props.changeProposalState(prop_id, new_state).then(() => {
      if (new_state === 1) {
        this.setState(
          {
            proposallist_popup_is_open: false,
          },
          () => {
            this.props
              .fetchTask(this.state.selected_task)
              .then((fetched_task) => {
                this.setState({
                  task: fetched_task,
                  loading: false,
                });
                this.onTabChange(this.state.selectedTab);
              });
          }
        );
      }
      this.props.fetchProposals(this.state.selected_task).then((proposals) => {
        this.setState({
          proposals: proposals.proposal_data,
        });
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className='container mytasks-container'>
          <div className='mytasks-section'>
            <div className='task-list-title'>Your Added Tasks</div>
            <MyTasksTabs
              selectedTab={this.state.selectedTab}
              onTabChange={this.onTabChange}
            />
            <TabContent activeTab={this.state.selectedTab}>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are publicly
                      available.
                    </div>
                    <MyTasksTable
                      tasks={this.props.my_available_tasks}
                      proposallist_toggle={this.proposallist_toggle}
                      setProposal={this.setProposal}
                      onDeleteTask={this.onDeleteTask}
                      tab={1}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are currently
                      being done by some user.
                    </div>
                    <MyTasksTable
                      tasks={this.props.assigned_tasks}
                      proposallist_toggle={this.proposallist_toggle}
                      setProposal={this.setProposal}
                      onDeleteTask={this.onDeleteTask}
                      tab={2}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='3'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are currently
                      not available for proposals.
                    </div>
                    <MyTasksTable
                      tasks={this.props.paused_tasks}
                      proposallist_toggle={this.proposallist_toggle}
                      setProposal={this.setProposal}
                      onDeleteTask={this.onDeleteTask}
                      tab={3}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='4'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are completed.
                      These tasks will not be available for further proposals.
                    </div>
                    <MyTasksTable
                      tasks={this.props.completed_tasks}
                      proposallist_toggle={this.proposallist_toggle}
                      setProposal={this.setProposal}
                      onDeleteTask={this.onDeleteTask}
                      tab={4}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='5'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and either you
                      removed them or the customer support deleted them from
                      Taskbarter.
                    </div>
                    <MyTasksTable
                      tasks={this.props.archived_tasks}
                      proposallist_toggle={this.proposallist_toggle}
                      setProposal={this.setProposal}
                      onDeleteTask={this.onDeleteTask}
                      tab={5}
                    />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
        <ProposalList
          modal={this.state.proposallist_popup_is_open}
          toggle={this.proposallist_toggle}
          proposals={this.state.proposals}
          onChangeProposalState={this.onChangeProposalState}
        />
        <DeleteTask
          modalIsOpen={this.state.deletetask_popup_is_open}
          toggle={this.deleteTask_toggle}
          closeModal={this.closeDeleteTaskPopup}
          deleteTask={this.deleteTaskFromPopup}
        />

        <MetaTags>
          <title>My Tasks | Taskbarter</title>
        </MetaTags>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  published_tasks: state.task.published_tasks,
  my_available_tasks: state.task.my_available_tasks,
  completed_tasks: state.task.completed_tasks,
  archived_tasks: state.task.archived_tasks,
  assigned_tasks: state.task.assigned_tasks,
  paused_tasks: state.task.paused_tasks,
});

export default connect(mapStateToProps, {
  fetchMyAvailableTasks,
  fetchCompletedTasks,
  fetchArchivedTasks,
  fetchAssignedTasks,
  fetchPausedTasks,
  fetchTask,
  fetchProposals,
  deleteTask,
  changeProposalState,
})(MyTasks);
