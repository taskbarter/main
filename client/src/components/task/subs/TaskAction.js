import React from 'react';
import { Link } from 'react-router-dom';

const TaskAction = (props) => {
  if (props.current_user === props.task_owner) {
    return (
      <React.Fragment>
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>Want to change some terms?</div>
          <div className='redeem-text'>
            You can update the content or remove it from public feed.
          </div>
          <Link to='/add'>
            <button className='btn redeem-btn'>Update Task</button>
          </Link>
        </div>

        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>Task Performance</div>
          <div className='redeem-text'>
            1 People have visited this task and {props.proposals.length} people
            sent a proposal.
          </div>
          <button
            onClick={props.proposallist_toggle}
            className='btn redeem-btn'
          >
            See Proposals ({props.proposals.length})
          </button>
        </div>
      </React.Fragment>
    );
  }

  if (!props.current_user) {
    return (
      <React.Fragment>
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>Want to do this task?</div>
          <div className='redeem-text'>
            Only logged in users are allowed to send proposals to this task.
          </div>
          <Link to='/login'>
            <button className='btn redeem-btn'>Login Now</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className='card card-body redeem-points mb-2'>
      <div className='redeem-heading'>Want to do this task?</div>
      <div className='redeem-text'>
        You can send proposal to this task and negotiate and chat with the task
        owner.
      </div>

      <button onClick={props.proposalform_toggle} className='btn redeem-btn'>
        Send Proposal
      </button>
    </div>
  );
};

export default TaskAction;
