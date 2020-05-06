import React from 'react';
import { Link } from 'react-router-dom';
import barter_work from '../../style/inc/barter_work.png';
import barter_bill from '../../style/inc/barter_bill.png';
import barter_hire from '../../style/inc/barter_hire.png';

const Barter = () => {
  return (
    <div className='row card card-body redeem-points mb-2 barter-steps'>
      <div className='col-md-4 step-section'>
        <span className='step-count'>1</span>
        <div className='step-img-container'>
          <img src={barter_work} alt='Barter Working' className='step-img' />
        </div>
        <div className='step-text'>Find Work</div>
        <div className='step-heading'>
          Explore tasks in the explore section and negotiate with the task
          owners.
        </div>
      </div>
      <div className='col-md-4 step-section'>
        <span className='step-count'>2</span>
        <div className='step-img-container'>
          <img src={barter_bill} alt='Barter Working' className='step-img' />
        </div>
        <div className='step-text'>Earn Points</div>
        <div className='step-heading'>
          Earn task points by completing the assignment with the decided terms.
        </div>
      </div>
      <div className='col-md-4 step-section'>
        <span className='step-count'>3</span>
        <div className='step-img-container'>
          <img src={barter_hire} alt='Barter Working' className='step-img' />
        </div>
        <div className='step-text'>Hire People</div>
        <div className='step-heading'>
          Once you have earned points, you can add tasks with your terms.
        </div>
      </div>
    </div>
  );
};

export default Barter;
