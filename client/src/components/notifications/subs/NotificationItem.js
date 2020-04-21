import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const NotificationItem = props => {
  return (
    <React.Fragment>
      <Link to={props.notif.link_to}>
        <div className='notification-item '>
          <div className='notif-text'>{props.notif.text}</div>
          <div className='notif-time'>{moment(props.notif.time).fromNow()}</div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default NotificationItem;
