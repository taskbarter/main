import React from 'react';
import { Link } from 'react-router-dom';

const WorkAction = (props) => {
  return (
    <div className='card card-body redeem-points mb-2'>
      <div className='redeem-heading'>Everything complete?</div>
      <div className='redeem-text'>
        Once you have done the required work, mark it as complete.
      </div>

      <button onClick={props.proposalform_toggle} className='btn redeem-btn'>
        Mark as Complete
      </button>
    </div>
  );
};

export default WorkAction;
