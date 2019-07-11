import React from 'react';

const AddTaskHints = props => {
  return (
    <div className='card card-body add-task-points mb-2'>
      <div className='add-task-points-heading'>Hints</div>
      <div className='add-task-hints'>
        <ul>
          <li>
            Points allocated for this task must be reasonable and comply with
            all the mentioned requirements and skills.
          </li>
          <li>
            Any violations of the Taskbarter's Policies would result in
            cancellation of this task publication plus some additional penalties
            to your account.
          </li>
          <li>
            Write your requirements in a comprehensive manner including all the
            required steps to initialize and finalize the task.
          </li>
          <li>
            Your headline must be catchy and meaningful. We recommend that you
            capitalize one or two keywords to highlight your task in the user
            feed.
          </li>
          <li>
            You must choose the most matching category and skills for this task.
            If more than one categories match the task, add the most relevant
            one and explain the rest in the requirements section.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddTaskHints;
