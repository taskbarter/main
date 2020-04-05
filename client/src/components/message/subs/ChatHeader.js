import React, { useState } from 'react';
import moment from 'moment';

const ChatHeader = props => {
  if (props.selected_convo === '') {
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
            {props.user.first_name} {props.user.second_name}
          </strong>{' '}
          (@{props.user.username})
        </span>
        <div className='dt-added-on'>
          Member since{' '}
          <span className='dt-date'>
            {moment(props.user.memberSince).years()}
          </span>{' '}
          • {props.user.location}
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
