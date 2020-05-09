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
  fetchCurrentlyWorkingTasks,
  fetchCompletedWorkingTasks,
} from '../../actions/taskAction';
import classnames from 'classnames';
import { connect } from 'react-redux';
import MyWorkTabs from './subs/MyWorkTabs';
import MyWorkTable from './subs/MyWorkTable';
import ProposalList from './subs/ProposalList';
import DeleteTask from './subs/DeleteTask';

class MyWork extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: '1',
      proposallist_popup_is_open: false,
      proposals: [],
      selected_task: 0,
      task: {},
    };
  }

  componentDidMount() {
    this.props.fetchCurrentlyWorkingTasks();
  }
  onTabChange = (tab) => {
    if (tab !== this.state.selectedTab) this.setState({ selectedTab: tab });
    if (tab == '1') this.props.fetchCurrentlyWorkingTasks();
    else if (tab == '2') this.props.fetchCompletedWorkingTasks();
  };

  proposallist_toggle = () => {
    this.setState({
      proposallist_popup_is_open: !this.state.proposallist_popup_is_open,
    });
  };

  setProposal = (task) => {
    this.setState(
      {
        task: task,
        loading: true,
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
            <div className='task-list-title'>Your Work</div>
            <MyWorkTabs
              selectedTab={this.state.selectedTab}
              onTabChange={this.onTabChange}
            />
            <TabContent activeTab={this.state.selectedTab}>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you are currently working on.
                    </div>
                    <MyWorkTable tasks={this.props.currently_working_tasks} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you have already completed
                      working on.
                    </div>
                    <MyWorkTable tasks={this.props.completed_working_tasks} />
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  currently_working_tasks: state.task.currently_working_tasks,
  completed_working_tasks: state.task.completed_working_tasks,
});

export default connect(mapStateToProps, {
  fetchCurrentlyWorkingTasks,
  fetchCompletedWorkingTasks,
})(MyWork);
