import React from 'react';

const ProfileBadge = () => {
  return (
    <div className='card card-body profile-badge'>
      <div className='profile-badge-dp'>
        <img src='/inc/Mohsin_DP.jpg' className='rounded img-thumbnail' />
      </div>
      <div className='profile-badge-name'>Mohsin Hayat</div>
      <div className='profile-badge-headline'>
        Full Stack Web Developer & Designer
      </div>
      <div className='profile-badge-categories'>
        <div className='profile-badge-category'>Web Development</div>
        <div className='profile-badge-category'>Wordpress Development</div>
        <div className='profile-badge-category'>Databases</div>
        <div className='profile-badge-category'>React Development</div>
        <div className='profile-badge-category'>Content Writing</div>
        <div className='profile-badge-category'>Designing</div>{' '}
        <span className='profile-categories-more'> and 16 more</span>
      </div>

      <div className='profile-badge-rating'>
        <i className='fas fa-star fa-fw' />
        <i className='fas fa-star fa-fw' />
        <i className='fas fa-star fa-fw' />
        <i className='fas fa-star-half-alt' />
        <i className='far fa-star fa-fw' />
        <br />
        <span className='profile-badge-rating-info'>(25 reviews)</span>
      </div>

      <div className='profile-badge-stats'>
        <div>
          Tasks Done: <span id='profile-tasks-done'>19</span> | Tasks Posted:{' '}
          <span id='profile-tasks-posted'>11</span> | Tasks Cancelled:{' '}
          <span id='profile-tasks-cancelled'>1</span> <br />
          Points Earned: <span id='profile-points-earned'>862</span> | Points
          Spent: <span id='profile-points-spent'>738</span>
        </div>
      </div>

      <span className='profile-badge-edit'>edit</span>
    </div>
  );
};

export default ProfileBadge;
