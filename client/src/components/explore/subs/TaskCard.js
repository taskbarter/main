import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from 'reactstrap';

import bookmark_icon from '../../../style/inc/bookmark.svg';
import share_icon from '../../../style/inc/share.svg';

import { Link } from 'react-router-dom';

const TaskCard = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState({
    num1: false,
    num2: false,
    num3: false,
  });

  const toggleTooltip1 = () => setTooltipOpen({ num1: !tooltipOpen.num1 });
  const toggleTooltip2 = () => setTooltipOpen({ num3: !tooltipOpen.num2 });
  const toggleTooltip3 = () => setTooltipOpen({ num3: !tooltipOpen.num3 });

  const skillsbadges2 = (skills) => {
    if (skills) {
      let fsix = skills;

      return fsix.map((skl, i) => (
        <div className='profile-skills' key={i}>
          {skl}
        </div>
      ));
    }
  };

  const skillSection = (
    <div className='profile-badge-categories'>
      {skillsbadges2(props.task.skills)}
    </div>
  );

  if (!props.task || props.task.userdetails === undefined) {
    return '';
  }

  const onSelectTask = () => {
    props.onClick(props.task._id);
  };

  const onTaskShare = () => {
    props.onTaskShare({
      from: `${props.task.userdetails[0].first_name} ${props.task.userdetails[0].second_name}`,
      task_url: `https://www.taskbarter.com/t/${props.task._id}`,
      task_headline: props.task.headline,
      task_category: props.task.category,
    });
  };

  return (
    <React.Fragment>
      <div className='feed-card'>
        <div className='feed-card--container' onClick={onSelectTask}>
          {' '}
          <div className='feed-card--category'>{props.task.category}</div>
          <div className='feed-card--applicants'>
            {props.task.totalApplicants ? props.task.totalApplicants : '0'}{' '}
            applicants
          </div>
          <div className='up-headline'>I want someone to</div>
          <div className='feed-card--header'>{props.task.headline}</div>
          <div className='skill-section'>{skillSection}</div>
          <div className='feed-card-person-details'>
            <span className='from'>
              {props.task.userdetails[0].first_name}{' '}
              {props.task.userdetails[0].second_name}
            </span>{' '}
            • <span className='loc'>{props.task.userdetails[0].location}</span>
          </div>
          <div className='feed-card--points' id='PointsEarned'>
            {props.task.taskpoints}
          </div>
        </div>
        <hr className='feed-card--sep' />
        <div className='feed-card--footer'>
          <div className='feed-card--footer-left '>
            {' '}
            <img
              src={bookmark_icon}
              className='svg_icon icon_inactive'
              id='SaveJob'
            ></img>
            &nbsp;&nbsp;&nbsp;
            <img
              src={share_icon}
              className='svg_icon icon_inactive'
              id='share-job'
              onClick={onTaskShare}
            ></img>
          </div>
          <div className='feed-card--footer-right '>
            <button className='feed-card-learn-more' onClick={onSelectTask}>
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Tooltip
        placement='left'
        isOpen={tooltipOpen.num1}
        target='PointsEarned'
        toggle={toggleTooltip1}
      >
        Points for this task
      </Tooltip>
      <Tooltip
        placement='bottom'
        isOpen={tooltipOpen.num3}
        target='SaveJob'
        toggle={toggleTooltip3}
      >
        Save this job
      </Tooltip>
    </React.Fragment>
  );
};
export default TaskCard;
