import React from 'react';

const SecondBlock = props => {
  const profile = props.profile;
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Experience
        <button className='btn notification-btn float-right'>Add</button>
      </div>
    </div>
  );
};

export default SecondBlock;
