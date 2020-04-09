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
  const getConvoCardClass = user => {
    if (props.selected_convo === user._id) {
      return 'convo-card is-selected';
    } else {
      return 'convo-card';
    }
  };
  const handleCardClick = id => {
    if (props.selected_convo !== id) {
      props.history.push('/messages/' + id);
      props.onConvoClick(id);
    }
  };

  return (
    <React.Fragment>
      {props.users.map((user, i) => {
        return (
          <div
            onClick={() => handleCardClick(user._id)}
            className={getConvoCardClass(user)}
            key={i}
          >
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
