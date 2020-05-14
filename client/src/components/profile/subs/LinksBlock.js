import React from 'react';
const LinksBlock = (props) => {
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
          onClick={props.addModal}
          style={{ marginLeft: '-23px' }}
          className='btn notification-btn float-right'
        >
          Edit
        </button>
      </div>
      <div
        className='profile-badge-categories mt-3'
        style={{ color: 'red', fontSize: '20px' }}
      >
        {profile.social.youtube !== undefined &&
        profile.social.youtube !== '' ? (
          <a className='mx-2' href={profile.social.youtube} target='_blank'>
            <i className='fab fa-youtube'></i>
          </a>
        ) : (
          <i></i>
        )}

        {profile.social.twitter !== undefined &&
        profile.social.twitter !== '' ? (
          <a
            className='mx-2'
            href={'https://www.twitter.com/' + profile.social.twitter}
            target='_blank'
          >
            <i className='fab fa-twitter'></i>
          </a>
        ) : (
          <i></i>
        )}

        {profile.social.facebook !== undefined &&
        profile.social.facebook !== '' ? (
          <a
            className='mx-2'
            href={'https://www.facebook.com/' + profile.social.facebook}
            target='_blank'
          >
            <i className='fab fa-facebook'></i>
          </a>
        ) : (
          <i></i>
        )}
        {profile.social.linkedin !== undefined &&
        profile.social.linkedin !== '' ? (
          <a
            className='mx-2'
            href={'https://www.linkedin.com/in/' + profile.social.linkedin}
            target='_blank'
          >
            <i className='fab fa-linkedin'></i>
          </a>
        ) : (
          <i></i>
        )}
        {profile.social.instagram !== undefined &&
        profile.social.instagram !== '' ? (
          <a
            className='mx-2'
            href={'https://www.instagram.com/' + profile.social.instagram}
            target='_blank'
          >
            <i className='fab fa-instagram-square'></i>
          </a>
        ) : (
          <i></i>
        )}
      </div>
    </div>
  );
};

export default LinksBlock;
