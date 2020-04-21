import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import AddTaskCTA from './AddTaskCTA';
import Notifications from './Notifications';
import RecommendedTasks from './RecommendedTasks';
import ProfileBadge from './ProfileBadge';
import Footer from '../layout/Footer';

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        {/* <Navbar /> */}
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <AddTaskCTA />
              <ProfileBadge />
            </div>
            <div className='col-md-8 order-md-1'>
              <Notifications history={this.props.history} />
              <RecommendedTasks />
            </div>
          </div>
        </main>
        <Footer />
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
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
