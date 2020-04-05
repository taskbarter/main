import React, { useState } from 'react';
import MsgItem from './MsgItem';

const current_user = '123123';

const ChatMessages = props => {
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
