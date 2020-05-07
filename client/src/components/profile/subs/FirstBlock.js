import React from 'react';
import month from '../../../config/months_name';
import status_type from '../../utils/Status_Type';
const FirstBlock = (props) => {
  const profile = props.profile;
  const user = props.user;
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
        <span className='profile-username'>(@{user.name})</span>
        <button
          onClick={props.editModal}
          className='btn notification-btn float-right'
          disabled={props.fetching_profile}
        >
          Edit
        </button>
      </div>
      <div className='profile-tagline'>
        {profile.headline ? (
          profile.headline
        ) : (
          <i style={{ color: 'grey', fontWeight: 300 }}>your tagline here...</i>
        )}
      </div>
      <div className='profile-member-since'>
        Member since {month[date_memberSince.getMonth()]}{' '}
        {date_memberSince.getFullYear()}
      </div>
      <br />
      <div className='bio-heading' style={{ marginBottom: '8px' }}>
        Personal Details
      </div>
      <div className='row' style={{ fontSize: '13px', marginBottom: '3px' }}>
        <div className='col-md-4'>
          Gender: <strong>{profile.gender}</strong>
        </div>
        <div className='col-md-4'>
          Location: <strong>{profile.location}</strong>
        </div>
        <div className='col-md-4'>
          Date of Birth:{' '}
          <strong>
            {profile.dob ? new Date(profile.dob).getFullYear() : 'Not Set'}
          </strong>
        </div>
      </div>
      <div className='row' style={{ fontSize: '13px', marginBottom: '3px' }}>
        <div className='col-md-4'>
          Email: <strong>{user.email}</strong>
        </div>
        <div className='col-md-4'>
          Username: <strong>{user.name}</strong>
        </div>
        <div className='col-md-4'>
          Availability: <strong>{status_type[profile.status]}</strong>
        </div>
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
    </div>
  );
};

export default FirstBlock;
