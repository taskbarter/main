import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TaskUpdateItem = (props) => {
  const updated_by =
    props.task_update.sender === props.assignee.user
      ? props.assignee
      : props.assignedTo;

  //if user has submitted work:
  if (props.task_update.type === 1) {
    return (
      <div className='card card-body mb-3 p-0 tu-border-highlight'>
        <div className='tu-update-top'>
          <div>
            <span className='tu-update-name'>
              {updated_by.first_name} {updated_by.second_name}
            </span>{' '}
            submitted the work {moment(props.task_update.createdAt).fromNow()}
          </div>
        </div>
        <div className='ql-editor dt-description align-middle text-center'>
          <div className='tu-icon'>
            <i class='fa fa-briefcase' aria-hidden='true'></i>
          </div>
          <div>Work Submitted!</div>
        </div>
      </div>
    );
  }

  //if task owner has rejected the work:
  if (props.task_update.type === 2) {
    return (
      <div className='card card-body mb-3 p-0 tu-border-highlight'>
        <div className='tu-update-top'>
          <div>
            <span className='tu-update-name'>
              {updated_by.first_name} {updated_by.second_name}
            </span>{' '}
            rejected the work {moment(props.task_update.createdAt).fromNow()}
          </div>
        </div>
        <div className='ql-editor dt-description align-middle text-center'>
          <div className='tu-icon'>
            <i class='fa fa-times' aria-hidden='true'></i>
          </div>
          <div>Work Rejected!</div>
        </div>
      </div>
    );
  }

  //if task owner has rejected the work:
  if (props.task_update.type === 3) {
    return (
      <div className='card card-body mb-3 p-0 tu-accept-box'>
        <div className='tu-update-top'>
          <div>
            <span className='tu-update-name'>
              {updated_by.first_name} {updated_by.second_name}
            </span>{' '}
            accepted the work {moment(props.task_update.createdAt).fromNow()}
          </div>
        </div>
        <div className='ql-editor dt-description align-middle text-center'>
          <div className='tu-icon'>
            <i class='fa fa-check' aria-hidden='true'></i>
          </div>
          <div class='tu-accept-text mb-1'>Work Accepted!</div>
          <div>Congrats, your work has been accepted!</div>
        </div>
      </div>
    );
  }

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
