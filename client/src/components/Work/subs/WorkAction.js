import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const WorkAction = (props) => {
  const isOwner = props.assignee.user === props.current_user;
  const other_user = !isOwner ? props.assignee : props.assignedTo;
  const user_info = (
    <div>
      <div className='card card-body redeem-points mb-2 tu-profile'>
        <div className='redeem-heading mb-3'>
          {' '}
          {isOwner ? 'Assigned To' : 'Task Owner'}
        </div>
        <div className='profile-badge-dp'>
          <img src='/inc/Mohsin_DP.jpg' className='rounded img-thumbnail' />
        </div>
        <div className='profile-badge-name'>
          {other_user.first_name} {other_user.second_name}
        </div>
        <div className='profile-badge-headline'>{other_user.headline}</div>

        <div className='dt-added-on mb-3'>
          Member since{' '}
          <span className='dt-date'>
            {moment(other_user.memberSince).years()}
          </span>{' '}
          • {other_user.location}
        </div>

        <Link className='clear-a' to='/messages'>
          <button className='btn redeem-btn'>
            <i class='fa fa-paper-plane' aria-hidden='true'></i> &nbsp;&nbsp;
            Send Message
          </button>
        </Link>
      </div>
    </div>
  );

  const status = (
    <div>
      <div className='card card-body redeem-points mb-2'>
        <div className='task-card-text'>
          {isOwner
            ? 'You are the owner of this task.'
            : 'This task was assigned to you.'}
        </div>
      </div>
    </div>
  );

  //if the work is completed.
  if (props.last_status === 3) {
    return (
      <React.Fragment>
        {status}
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading mb-2'>Task Completed</div>
          <div className='task-card-text'>
            The task has been finalized and the work has been successfully
            delivered to the task owner.
          </div>
        </div>
        {user_info}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {status}
      <div className='card card-body redeem-points mb-2'>
        <div className='redeem-heading'>Everything complete?</div>
        <div className='redeem-text'>
          {isOwner
            ? props.last_status === 1
              ? 'The user has submitted the work. Review the work and then accordingly click on the button below.'
              : 'You can mark this as complete if the work is completed by the user.'
            : props.last_status === 1
            ? 'You have already submitted the work. Please wait for the task owner to review the task.'
            : 'Once you have done the required work, mark it as complete.'}
        </div>
        {props.last_status === 1 && isOwner ? (
          <div className='act-rej'>
            <button
              onClick={props.onAcceptWork}
              disabled={props.submitting_state}
              className='col-6 btn redeem-btn accept-btn'
            >
              <i className='fa fa-check' aria-hidden='true'></i> &nbsp; Accept
            </button>
            <button
              onClick={props.onRejectWork}
              disabled={props.submitting_state}
              className='col-6 btn redeem-btn reject-btn'
            >
              <i className='fa fa-times' aria-hidden='true'></i> &nbsp; Reject
            </button>
          </div>
        ) : (
          <button
            disabled={props.submitting_state || props.last_status === 1}
            onClick={isOwner ? props.onAcceptWork : props.onSubmitWork}
            className='btn redeem-btn'
          >
            {isOwner
              ? 'Mark as Complete'
              : props.submitting_state
              ? 'Submitting...'
              : props.last_status === 1
              ? 'Submitted'
              : 'Submit Work'}
          </button>
        )}
      </div>

      {user_info}
    </React.Fragment>
  );
};

export default WorkAction;
