import React from 'react';

const RatingAvg = (props) => {
  return (
    <span>
      <span>
        {props.rating >= 1 ? (
          <i className='fas fa-star fa-fw' />
        ) : props.rating >= 0.5 ? (
          <i className='fas fa-star-half-alt' />
        ) : (
          <i className='far fa-star fa-fw' />
        )}

        {props.rating >= 2 ? (
          <i className='fas fa-star fa-fw' />
        ) : props.rating >= 1.5 ? (
          <i className='fas fa-star-half-alt' />
        ) : (
          <i className='far fa-star fa-fw' />
        )}

        {props.rating >= 3 ? (
          <i className='fas fa-star fa-fw' />
        ) : props.rating >= 2.5 ? (
          <i className='fas fa-star-half-alt' />
        ) : (
          <i className='far fa-star fa-fw' />
        )}

        {props.rating >= 4 ? (
          <i className='fas fa-star fa-fw' />
        ) : props.rating >= 3.5 ? (
          <i className='fas fa-star-half-alt' />
        ) : (
          <i className='far fa-star fa-fw' />
        )}

        {props.rating >= 5 ? (
          <i className='fas fa-star fa-fw' />
        ) : props.rating >= 4.5 ? (
          <i className='fas fa-star-half-alt' />
        ) : (
          <i className='far fa-star fa-fw' />
        )}
        {/* <i className='fas fa-star fa-fw' />
          <i className='fas fa-star fa-fw' />
          <i className='fas fa-star fa-fw' />
          <i className='fas fa-star-half-alt' />
          <i className='far fa-star fa-fw' /> */}
      </span>
    </span>
  );
};

export default RatingAvg;
