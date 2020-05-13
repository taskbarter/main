import React, { useState } from 'react';

const ChatTextArea = (props) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      props.onMessageSend();
    }
  };
  return (
    <React.Fragment>
      <div className='chat-typing-container'>
        <div className='row'>
          <div className='msg-type-area'>
            <textarea
              value={props.current_message}
              onChange={props.onMessageType}
              onKeyPress={onKeyPress}
              className='form-control chat-editor'
              placeholder='enter message...'
              rows='2'
              disabled={props.selected_convo === ''}
            />
          </div>
          <div className='msg-send-container'>
            <button
              className='btn chat-send-btn'
              disabled={props.selected_convo === ''}
              onClick={props.onMessageSend}
            >
              Send
            </button>
            <span className='press-enter'>or press enter</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatTextArea;
