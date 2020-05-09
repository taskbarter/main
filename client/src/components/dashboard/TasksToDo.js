import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TaskState from '../task/subs/TaskState';
const TasksToDo = (props) => {
  const onViewAllBtn = () => {
    props.history.push('/mywork');
  };
  if (!props.working_tasks || props.working_tasks.work_data.length === 0) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className='card card-body mb-2'>
      <div className='tasks-heading'>
        Tasks You Work on
        <button onClick={onViewAllBtn} className='btn notification-btn fl-r'>
          View All
        </button>
      </div>
      <div className='redeem-text' className='notif-list'>
        {props.working_tasks.work_data.map((work, id) => {
          const task = work.taskDetails[0];
          return (
            <div key={id}>
              <Link className='clear-a' to={`/w/${work._id}`}>
                <div className='notification-item'>
                  <div className='sm-task-top'>I want someone to</div>
                  <TaskState state={task.state} />
                  <div className='notif-text'>{task.headline}</div>
                  <div className='dt-added-on sm-task-footer'>
                    Updated {moment(task.updatedAt).fromNow()} •{' '}
                    {task.taskpoints} pts
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksToDo;
