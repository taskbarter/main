import React from 'react';
/* eslint react/prop-types: 0 */
import styles from './nav.css';

const Nav = props => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    let classNameTemp = 'dot ' + (isActive ? 'active' : '');
    let keyTemp = 'step-' + i;
    dots.push(
      <span
        key={keyTemp}
        className={classNameTemp}
        onClick={() => props.goToStep(i)}
      >
        &bull;
      </span>
    );
  }

  return <div className='nav'>{dots}</div>;
};

export default Nav;
