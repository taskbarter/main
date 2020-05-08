import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import RatingStars from './RatingStars';

const FeedbackUpdateCard = (props) => {
  const updated_by =
    props.feedback.from === props.assignee.user
      ? props.assignee
      : props.assignedTo;

  return (
    <div className='card card-body mb-3 p-0'>
      <div className='tu-update-top tu-feedback'>
        <div>
          <span className='tu-update-name'>
            {updated_by.first_name} {updated_by.second_name}
          </span>{' '}
          submitted a feedback {moment(props.feedback.createdAt).fromNow()}
          {props.assignee.user === updated_by.user ? (
            <span className='tu-owner-pill'>Owner</span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div className='ql-editor dt-description feedback-block'>
        <RatingStars feedback_stars={props.feedback.rating} readonly='true' />
        <div className='feedback-text'>"{props.feedback.text}"</div>
      </div>
    </div>
  );
};

export default FeedbackUpdateCard;
