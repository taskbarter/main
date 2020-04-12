import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from 'reactstrap';

import bookmark_icon from '../../../style/inc/bookmark.svg';
import share_icon from '../../../style/inc/share.svg';
import moment from 'moment';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  const getConvoCardClass = (conv) => {
    if (props.selected_convo === conv._id) {
      return 'convo-card is-selected';
    } else {
      return 'convo-card';
    }
  };
  const handleCardClick = (id) => {
    if (props.selected_convo !== id) {
      props.history.push('/messages/' + id);
      props.onConvoClick(id);
    }
  };
  return (
    <React.Fragment>
      {props.conversation_list.map((conv, i) => {
        const user =
          conv.user1 === props.current_user_id
            ? conv.user2_details[0]
            : conv.user1_details[0];
        return (
          <div
            onClick={() => handleCardClick(conv._id)}
            className={getConvoCardClass(conv)}
            key={i}
          >
            <span className='avatar'>
              <img src='/inc/Mohsin_DP.jpg' className='rounded avatar-image' />
            </span>
            <div className='personal-info'>
              <div className='name'>
                {user.first_name} {user.second_name}
              </div>
              <div className='lastmsg'>{conv.last_message[0].text}</div>
            </div>
            <div className='date-icon-block'>
              <div className='date'>
                {moment(conv.last_message[0].time).fromNow()}
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default UserList;
