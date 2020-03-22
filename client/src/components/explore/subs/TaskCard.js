import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap';

import { Link } from 'react-router-dom';

const TaskCard = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const skillsbadges2 = skills => {
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
  return (
    <React.Fragment>
      <div className='feed-card'>
        <div className='feed-card--container'>
          {' '}
          <div className='feed-card--category'>{props.task.category}</div>
          <div className='feed-card--applicants'>
            {props.task.applicants} applicants
          </div>
          <div className='up-headline'>I want someone to</div>
          <div className='feed-card--header'>{props.task.headline}</div>
          <div className='skill-section'>{skillSection}</div>
          <div className='feed-card-person-details'>
            <span className='from'>{props.task.from}</span> •{' '}
            <span className='loc'>{props.task.location}</span>
          </div>
          <div className='feed-card--points' id='PointsEarned'>
            {props.task.points}
          </div>
        </div>
        <hr className='feed-card--sep' />
        <div className='feed-card--footer'>
          <div className='feed-card--footer-left '>save</div>
          <div className='feed-card--footer-right '>
            <button className='feed-card-learn-more'>Learn More</button>
          </div>
        </div>
      </div>
      <Tooltip
        placement='left'
        isOpen={tooltipOpen}
        target='PointsEarned'
        toggle={toggleTooltip}
      >
        Points for this task
      </Tooltip>
    </React.Fragment>
  );
};
export default TaskCard;
