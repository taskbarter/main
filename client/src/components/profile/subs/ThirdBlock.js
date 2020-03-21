import React from 'react';

const ThirdBlock = props => {
  const profile = props.profile;
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Projects
        <button className='btn notification-btn float-right'>Add</button>
      </div>
    </div>
  );
};

export default ThirdBlock;
