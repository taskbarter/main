import React from 'react';

const AddTaskCTA = () => {
  return (
    <div className='card card-body redeem-points mb-2'>
      <div className='redeem-heading'>Redeem Your Points</div>
      <div className='redeem-text'>
        You can use your earned points to add tasks to Taskbarter according to
        your terms and requirements.
      </div>
      <a href='/add'>
        <button className='btn redeem-btn'>Add a task</button>
      </a>
    </div>
  );
};

export default AddTaskCTA;
