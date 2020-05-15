import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  fetchPublishedTasks,
  fetchWorkingTasks,
  fetchPendingProposals,
} from '../../actions/taskAction';
import AddTaskCTA from './AddTaskCTA';
import Notifications from './Notifications';
import RecommendedTasks from './RecommendedTasks';
import ProfileBadge from './ProfileBadge';
import Footer from '../layout/Footer';
import TasksPublished from './TasksPublished';
import TasksToDo from './TasksToDo';
import { getNotifications } from '../../actions/notifActions';
import Barter from './Barter';
import { getCurrentProfileRatings } from '../../actions/profileAction';
import MetaTags from 'react-meta-tags';

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.fetchPublishedTasks(3);
    this.props.fetchWorkingTasks(3);
    this.props.getNotifications();
    this.props.getCurrentProfileRatings();
    this.props.fetchPendingProposals();
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        {/* <Navbar /> */}
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-lg-4 order-lg-2 mb-2'>
              <AddTaskCTA />

              <ProfileBadge />
            </div>
            <div className='col-lg-8 order-lg-1'>
              <Barter />
              <Notifications
                notifs={this.props.notifications.notifications}
                history={this.props.history}
              />
              <TasksPublished
                published_tasks={this.props.published_tasks}
                history={this.props.history}
              />

              <TasksToDo
                working_tasks={this.props.working_tasks}
                history={this.props.history}
              />
              <RecommendedTasks />
            </div>
          </div>
        </main>
        <Footer />
        <MetaTags>
          <title>Dashboard | Taskbarter</title>
        </MetaTags>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  published_tasks: state.task.published_tasks,
  working_tasks: state.task.working_tasks,
  notifications: state.notifications,
});
export default connect(mapStateToProps, {
  logoutUser,
  fetchPublishedTasks,
  fetchWorkingTasks,
  getNotifications,
  getCurrentProfileRatings,
  fetchPendingProposals,
})(Dashboard);
