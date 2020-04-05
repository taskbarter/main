import React, { useState } from 'react';

const current_user = '123123';

const MsgItem = props => {
  if (current_user === props.msg.from) {
    return (
      <React.Fragment>
        <div className='message-item msg-right'>
          <div className='message-bubble'>{props.msg.text}</div>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className='message-item msg-left'>
        <div className='message-bubble'>{props.msg.text}</div>
      </div>
    </React.Fragment>
  );
};

export default MsgItem;
