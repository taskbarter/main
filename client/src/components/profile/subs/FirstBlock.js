import React from 'react';
import month from '../../../config/months_name';
const FirstBlock = props => {
  const profile = props.profile;
  let date_memberSince = Date.now();
  if (profile) {
    date_memberSince = new Date(profile.memberSince);
  }
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading profile-name'>
        {profile.first_name} {profile.second_name}
        <button className='btn notification-btn float-right'>Edit</button>
      </div>
      <div className='profile-tagline'>
        {profile.headline ? (
          profile.headline
        ) : (
          <i style={{ color: 'grey', fontWeight: 100 }}>your tagline here...</i>
        )}
      </div>
      <div className='profile-member-since'>
        Member since {month[date_memberSince.getMonth()]}{' '}
        {date_memberSince.getFullYear()}
      </div>

      <br />
      <div className='bio-heading'>Bio</div>

      <div className='bio-text'>
        {' '}
        {profile.bio ? (
          profile.bio
        ) : (
          <i style={{ color: 'grey', fontWeight: 100 }}>your bio here...</i>
        )}
      </div>
      <br />

      <div className='bio-heading'>Personal Details</div>
      <div className='row' style={{ fontSize: '13px', marginBottom: '5px' }}>
        <div className='col-4'>
          Gender: <strong>{profile.gender}</strong>
        </div>
        <div className='col-4'>
          Location: <strong>{profile.location}</strong>
        </div>
        <div className='col-4'>
          Date of Birth: <strong>{profile.location}</strong>
        </div>
      </div>
    </div>
  );
};

export default FirstBlock;
