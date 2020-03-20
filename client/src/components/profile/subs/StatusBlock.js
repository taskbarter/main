import React from 'react';
const StatusBlock = props => {
  const profile = props.profile;
  let date_memberSince = Date.now();
  if (profile) {
    date_memberSince = new Date(profile.memberSince);
  }
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card card-body redeem-points mb-2'>
      <div className='redeem-heading'>Current Status</div>
      <div
        className='redeem-text'
        style={{ textAlign: 'left', fontSize: '10px' }}
      >
        {' '}
        I'm available as{' '}
        <select class='profile-status-select'>
          <option defaultChecked value='fullTime'>
            New User (first time using Taskbarter)
          </option>
          <option value='fullTime'>Full Time (40 hours a week)</option>
          <option value='fullTime'>Part Time (20 hours a week)</option>
          <option value='fullTime'>
            Occassional Visitor (5-10 hours a week)
          </option>
          <option value='fullTime'>Casual Visitor (1-2 hours a week)</option>
          <option value='fullTime'>Not Available</option>
        </select>
      </div>
    </div>
  );
};

export default StatusBlock;
