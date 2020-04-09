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

const notifs = [
  {
    text: `Your task 'create new website' has been completed by Anas Usman.`,
    time: Date.now(),
    link_to: '/tasks/312',
    _id: '123456'
  },
  {
    text: `Your task 'proofread this text' has been deleted as it violates our terms and conditions`,
    time: Date.now(),
    link_to: '/tasks/612',
    _id: '123457'
  },
  {
    text: `You haven't updated your profile yet. Update it to get matched jobs on Taskbarter`,
    time: Date.now(),
    link_to: '/tasks/21',
    _id: '123458'
  },
  {
    text: `35 people have bookmarked your task recently.`,
    time: Date.now(),
    link_to: '/tasks/512',
    _id: '123459'
  }
];

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: '',
      current_notifications: notifs
    };
  }
  componentDidMount() {}
  onConvoClick = id => {};

  render() {
    return (
      <div className='container notif-container'>
        <div className='notif-section'>
          <div className='task-list-title'>Your recent notifications</div>
          <div className='notif-list'>
            {this.state.current_notifications.map((notif, key) => {
              return <NotificationItem notif={notif} key={key} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket_connection: state.socket.socket_connection,
  auth: state.auth
});

export default connect(mapStateToProps, {})(Notifications);
