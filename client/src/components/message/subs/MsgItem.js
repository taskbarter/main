import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchTask } from '../../../actions/taskAction';

const MsgItem = (props) => {
  const MessageTypeException = (msg) => {
    const type = msg.content_type;
    if (type === 0) {
      return <span></span>;
    } else if (type === 1) {
      //console.log(msg.content_payload);
      const payload_obj = JSON.parse(msg.content_payload);
      return (
        <div>
          <div className='task-list-title'>Proposal</div>
          <div className='task-prop-task'>
            <span className='task-prop-title'>Task: </span> I want someone to{' '}
            {payload_obj.task_headline}
            <br />
            <span className='task-prop-title'>Points: </span>
            {payload_obj.task_points}
          </div>
        </div>
      );
    }
  };

  if (props.current_user === props.msg.sender) {
    return (
      <React.Fragment>
        <div className='message-item msg-right'>
          <div className='message-bubble'>
            {MessageTypeException(props.msg)}
            {props.msg.text}
          </div>
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
        <div className='message-bubble'>
          {MessageTypeException(props.msg)}
          {props.msg.text}
        </div>
        <div className='msg-time'>
          {moment(props.msg.createdAt || props.msg.time).format(
            'DD-MM-YYYY - HH:mm'
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, {
  fetchTask,
})(MsgItem);
