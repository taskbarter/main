import React from 'react';
import Rating from 'react-rating';
import star_outline from '../../../style/inc/star_outline.png';
import star_filled from '../../../style/inc/star_filled.png';

const RatingStars = (props) => {
  return (
    <div className='feedback-rating feedback-update'>
      <Rating
        onChange={props.onStarChange}
        initialRating={props.feedback_stars}
        emptySymbol={<img src={star_outline} className='rate-icon' />}
        fullSymbol={<img src={star_filled} className='rate-icon' />}
        readonly={props.readonly !== undefined}
      />
    </div>
  );
};

export default RatingStars;
