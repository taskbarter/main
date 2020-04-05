import React, { useState } from 'react';
import MsgItem from './MsgItem';

const current_user = '123123';

const ChatMessages = props => {
  if (props.selected_convo === '') {
    return (
      <div className='chat-messages-container'>
        <div className='no-convo'>
          Please select a conversation to see messages.
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className='chat-messages-container'>
        {props.msgs.map((msg, i) => {
          return (
            <div key={i}>
              <MsgItem msg={msg} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ChatMessages;
