import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TaskUpdateItem = (props) => {
  const updated_by =
    props.task_update.sender === props.assignee.user
      ? props.assignee
      : props.assignedTo;
  return (
    <div className='card card-body mb-3 p-0'>
      <div className='tu-update-top'>
        <div>
          <span className='tu-update-name'>
            {updated_by.first_name} {updated_by.second_name}
          </span>{' '}
          posted an update {moment(props.task_update.createdAt).fromNow()}
          {props.assignee.user === updated_by.user ? (
            <span className='tu-owner-pill'>Owner</span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div className='ql-editor dt-description'>
        <div
          dangerouslySetInnerHTML={{
            __html: props.task_update.text,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TaskUpdateItem;
