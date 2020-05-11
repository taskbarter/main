import React from 'react';
import { Link } from 'react-router-dom';
import TaskShareIcons from '../../utils/TaskShareIcons';

const TaskAction = (props) => {
  const status_comp = (
    <React.Fragment>
      <div className='card card-body redeem-points mb-2'>
        <div className='task-card-text'>
          {props.task_state === 4
            ? 'This task is assigned to a user.'
            : props.task_state === 0
            ? 'This task is available for proposals.'
            : props.task_state === 1
            ? 'This task is already completed.'
            : props.task_state === 2
            ? 'This task is currently paused.'
            : props.task_state === 3
            ? 'This task is currently removed.'
            : 'This task is not available.'}
        </div>
      </div>
    </React.Fragment>
  );

  const Share_Icons = (
    <React.Fragment>
      <div className='card card-body redeem-points mb-2'>
        <div className='task-card-text'>
          <TaskShareIcons
            task_headline={props.task.headline}
            task_url={`https://www.taskbarter.com/t/${props.task_id}`}
            from={props.from}
          />
        </div>
      </div>
    </React.Fragment>
  );

  if (props.current_user === props.task_owner) {
    //if it is assigned and the owner is viewing:
    if (props.task_state === 4 && props.task_work) {
      return (
        <React.Fragment>
          {status_comp}
          <div className='card card-body redeem-points mb-2'>
            <div className='redeem-heading'>See Updates on Task</div>
            <div className='redeem-text'>
              This task is currently assigned and a user is working on it
              already.
            </div>
            <Link to={`/w/${props.task_work._id}`}>
              <button className='btn redeem-btn'>See Updates</button>
            </Link>
          </div>

          <div className='card card-body redeem-points mb-2'>
            <div className='redeem-heading'>Task Performance</div>
            <div className='redeem-text'>
              1 People have visited this task and {props.proposals.length}{' '}
              people sent a proposal.
            </div>
            <button className='btn redeem-btn' disabled>
              See Proposals ({props.proposals.length})
            </button>
          </div>
        </React.Fragment>
      );
    }

    //if it is completed and the owner is viewing:
    if (props.task_state === 1 && props.task_work) {
      return (
        <React.Fragment>
          {status_comp}
          <div className='card card-body redeem-points mb-2'>
            <div className='redeem-heading'>See Updates on Task</div>
            <div className='redeem-text'>
              This task is already completed. You can view the work done by the
              hired user.
            </div>
            <Link to={`/w/${props.task_work._id}`}>
              <button className='btn redeem-btn'>See Updates</button>
            </Link>
          </div>

          <div className='card card-body redeem-points mb-2'>
            <div className='redeem-heading'>Task Performance</div>
            <div className='redeem-text'>
              1 People have visited this task and {props.proposals.length}{' '}
              people sent a proposal.
            </div>
            <button className='btn redeem-btn' disabled>
              See Proposals ({props.proposals.length})
            </button>
          </div>
        </React.Fragment>
      );
    }

    //if it is removed and the owner is viewing:
    if (props.task_state === 3) {
      return <React.Fragment>{status_comp}</React.Fragment>;
    }

    return (
      <React.Fragment>
        {status_comp}
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>Want to change some terms?</div>
          <div className='redeem-text'>
            You can update the content or remove the task completely from public
            feed.
          </div>
          <Link to={`/e/${props.task_id}`}>
            <button className='btn redeem-btn'>Edit Task</button>
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
            disabled={props.proposals.length === 0}
          >
            See Proposals ({props.proposals.length})
          </button>
        </div>
        {Share_Icons}
      </React.Fragment>
    );
  }

  if (
    props.task_state === 4 &&
    props.task_work &&
    props.current_user === props.task_work.assignedTo
  ) {
    return (
      <React.Fragment>
        {status_comp}
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>Assigned to You</div>
          <div className='redeem-text'>
            This task is assigned to you and the task poster is waiting for you
            to submit the work.
          </div>
          <Link to={`/w/${props.task_work._id}`}>
            <button className='btn redeem-btn'>See Task Work</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }

  if (!props.current_user) {
    return (
      <React.Fragment>
        {status_comp}
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>Want to do this task?</div>
          <div className='redeem-text'>
            Only logged in users are allowed to send proposals to this task.
          </div>
          <Link to='/login'>
            <button className='btn redeem-btn'>Login Now</button>
          </Link>
        </div>
        {Share_Icons}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {status_comp}
      <div className='card card-body redeem-points mb-2'>
        <div className='redeem-heading'>Want to do this task?</div>
        <div className='redeem-text'>
          You can send proposal to this task and negotiate and chat with the
          task owner.
        </div>

        <button onClick={props.proposalform_toggle} className='btn redeem-btn'>
          Send Proposal
        </button>
      </div>
      {Share_Icons}
    </React.Fragment>
  );
};

export default TaskAction;
