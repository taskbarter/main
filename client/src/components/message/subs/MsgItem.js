import React, { useState } from 'react';
import moment from 'moment';

const MsgItem = (props) => {
  if (props.current_user === props.msg.sender) {
    return (
      <React.Fragment>
        <div className='message-item msg-right'>
          <div className='message-bubble'>{props.msg.text}</div>
          <div className='msg-time'>
            {moment(props.msg.createdAt || props.msg.time).format(
              'DD-MM-YYYY - HH:mm'
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className='message-item msg-left'>
        <div className='message-bubble'>{props.msg.text}</div>
        <div className='msg-time'>
          {moment(props.msg.createdAt || props.msg.time).format(
            'DD-MM-YYYY - HH:mm'
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MsgItem;
