import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { readNotification } from '../../../actions/notifActions';

const NotificationItem = (props) => {
  const notifRead = (e, notif) => {
    console.log(notif);
    //readNotification();
  };
  return (
    <React.Fragment>
      <Link onClick={readNotification(props.notif._id)} to={props.notif.link}>
        <div
          className={
            props.notif.seen
              ? 'notification-item'
              : 'notification-item unread-type'
          }
        >
          <div className='notif-text'>
            {props.notif.text}
            {!props.notif.seen ? <span className='unread-pill'></span> : ''}
          </div>
          <div className='notif-time'>
            {moment(props.notif.createdAt).fromNow()}
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default NotificationItem;
