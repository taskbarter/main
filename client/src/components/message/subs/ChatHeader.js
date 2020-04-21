import React, { useState } from 'react';
import moment from 'moment';

const ChatHeader = (props) => {
  if (props.selected_convo === '') {
    return (
      <React.Fragment>
        <div className='chat-header-container'></div>
      </React.Fragment>
    );
  }
  const { conv_obj } = props;
  let user;
  if (props.selected_convo !== '' && conv_obj.user1 !== undefined) {
    user =
      conv_obj.user1 === props.current_user_id
        ? { ...conv_obj.user2_details[0], ...conv_obj.user2_username[0] }
        : { ...conv_obj.user1_details[0], ...conv_obj.user1_username[0] };
  } else {
    return (
      <React.Fragment>
        <div className='chat-header-container'></div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className='chat-header-container'>
        <span className='dt-points'>
          <strong>
            {user.first_name} {user.second_name}
          </strong>{' '}
          (@{user.name})
        </span>
        <div className='dt-added-on'>
          Member since{' '}
          <span className='dt-date'>{moment(user.memberSince).year()}</span>{' '}
          {user.location ? <span> • {user.location} </span> : ''}
          {props.isTyping ? <span> • Typing Message </span> : ''}
        </div>

        <div className='close-chat-btn'>
          <button
            onClick={props.onCloseBtn}
            type='button'
            className='close'
            aria-label='Close'
          >
            <span aria-hidden='true'>×</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatHeader;
