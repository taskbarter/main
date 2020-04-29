import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const WorkAction = (props) => {
  const isOwner = props.assignee.user === props.current_user;
  const other_user = !isOwner ? props.assignee : props.assignedTo;
  const user_info = (
    <div>
      <div className='card card-body redeem-points mb-2 tu-profile'>
        <div className='redeem-heading mb-2'>
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

  return (
    <React.Fragment>
      {status}
      <div className='card card-body redeem-points mb-2'>
        <div className='redeem-heading'>Everything complete?</div>
        <div className='redeem-text'>
          {isOwner
            ? 'You can mark this as complete if the work is completed by the user.'
            : 'Once you have done the required work, mark it as complete.'}
        </div>

        <button onClick={props.proposalform_toggle} className='btn redeem-btn'>
          {isOwner ? 'Mark as Complete' : 'Submit Work'}
        </button>
      </div>

      {user_info}
    </React.Fragment>
  );
};

export default WorkAction;