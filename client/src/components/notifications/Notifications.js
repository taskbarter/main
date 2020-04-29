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
import { getNotifications } from '../../actions/notifActions';

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
    if (!this.props.notifications) {
      return <div className='container notif-container'>Loading...</div>;
    }
    return (
      <div className='container notif-container'>
        <div className='notif-section'>
          <div className='task-list-title'>Your recent notifications</div>
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

export default connect(mapStateToProps, { getNotifications })(Notifications);
