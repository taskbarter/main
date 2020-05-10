import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { userPersonalDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../style/notifications.css';
import { Input } from 'reactstrap';
import socketIOClient from 'socket.io-client';
import NotificationItem from './subs/NotificationItem';
import {
  getNotifications,
  readAllNotifications,
} from '../../actions/notifActions';
import TLoader from '../utils/TLoader';

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: '',
    };
  }
  componentDidMount() {
    this.props.getNotifications();
  }
  onConvoClick = (id) => {};

  render() {
    if (
      !this.props.notifications ||
      this.props.notifications.notifications.length < 1
    ) {
      return (
        <div className='container notif-container'>
          <div className='notif-section'>
            <div className='task-list-title'>Your recent notifications </div>
            <div className='taskv-loader' style={{ height: '25vh' }}>
              <TLoader colored={true} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='container notif-container'>
        <div className='notif-section'>
          <div className='task-list-title'>
            Your recent notifications
            <button
              onClick={this.props.readAllNotifications}
              className='btn notification-btn fl-r'
            >
              Mark all as read
            </button>
          </div>
          <div className='notif-list'>
            {this.props.notifications.notifications.map((notif, key) => {
              return <NotificationItem notif={notif} key={key} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socket_connection: state.socket.socket_connection,
  auth: state.auth,
  notifications: state.notifications,
});

export default connect(mapStateToProps, {
  getNotifications,
  readAllNotifications,
})(Notifications);
