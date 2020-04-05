import React, { useState } from 'react';
import moment from 'moment';

const ChatHeader = props => {
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
      </div>
    </React.Fragment>
  );
};

export default ChatHeader;
