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

  const onStatusChange = e => {
    props.changeStatus(e.target.value);
  };

  return (
    <div className='card card-body redeem-points mb-2'>
      <div className='redeem-heading'>Current Status</div>
      <div
        className='redeem-text'
        style={{ textAlign: 'left', fontSize: '10px' }}
      >
        {' '}
        I'm available as{' '}
        <select
          onChange={onStatusChange}
          defaultValue={profile.status}
          className='profile-status-select'
        >
          <option value='0'>New User (first time using Taskbarter)</option>
          <option value='1'>Full Time (40 hours a week)</option>
          <option value='2'>Part Time (20 hours a week)</option>
          <option value='3'>Occassional Visitor (5-10 hours a week)</option>
          <option value='4'>Casual Visitor (1-2 hours a week)</option>
          <option value='5'>Not Available</option>
        </select>
      </div>
    </div>
  );
};

export default StatusBlock;
