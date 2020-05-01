import Skeleton from 'react-loading-skeleton';
import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';

const TaskCardSkeleton = (props) => {
  return (
    <div>
      <div className='feed-card card-skeleton'>
        <div className='feed-card--container'>
          {' '}
          <div className='feed-card--category'>
            <Skeleton />
          </div>
          <div className='feed-card--applicants'>
            <Skeleton />
          </div>
          <div className='up-headline'>
            <Skeleton />
            <Skeleton />
          </div>
          <div className='feed-card--header'>
            <Skeleton />
          </div>
          <div className='skill-section'>
            <Skeleton />
          </div>
          <div className='feed-card-person-details'>
            <Skeleton />
          </div>
          <div className='feed-card--points' id='PointsEarned'></div>
        </div>
        <hr className='feed-card--sep' />
        <div className='feed-card--footer'>
          <div className='feed-card--footer-left '>
            <Skeleton />
          </div>
          <div className='feed-card--footer-right '>
            <button className='feed-card-learn-more'></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
