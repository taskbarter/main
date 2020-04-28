import React from 'react';
import classnames from 'classnames';

const TaskState = (props) => {
  if (props.state === 1) {
    return <div className='task-state'>Completed</div>;
  }
  if (props.state === 2) {
    return <div className='task-state'>Paused</div>;
  }
  if (props.state === 3) {
    return <div className='task-state'>Archived</div>;
  }
  if (props.state === 4) {
    return <div className='task-state --assigned'>Assigned</div>;
  } else {
    return <div className='task-state'>Pending</div>;
  }
};

export default TaskState;
