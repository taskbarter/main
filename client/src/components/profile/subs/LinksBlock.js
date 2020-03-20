import React from 'react';
const LinksBlock = props => {
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
      <div className='redeem-heading'>
        Links
        <button
          style={{ marginLeft: '-23px' }}
          className='btn notification-btn float-right'
        >
          +
        </button>
      </div>
      <div
        className='redeem-text'
        style={{ textAlign: 'left', fontSize: '10px' }}
      ></div>
    </div>
  );
};

export default LinksBlock;
