import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap';

import bookmark_icon from '../../../style/inc/bookmark.svg';
import share_icon from '../../../style/inc/share.svg';
import moment from 'moment';
import { Link } from 'react-router-dom';

const UserList = props => {
  return (
    <React.Fragment>
      {props.users.map((user, i) => {
        return (
          <div className='convo-card'>
            <span className='avatar'>
              <img src='/inc/Mohsin_DP.jpg' className='rounded avatar-image' />
            </span>
            <div className='personal-info'>
              <div className='name'>{user.name}</div>
              <div className='lastmsg'>{user.last_msg}</div>
            </div>
            <div className='date-icon-block'>
              <div className='date'>{moment(user.msg_time).fromNow()}</div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default UserList;
