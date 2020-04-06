import React from 'react';

const TLoader = props => {
  if (!props.colored) {
    return (
      <div className='lds-ring lds-centered'>
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  } else {
    return (
      <div className='lds-ring lds-centered colored'>
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
};

export default TLoader;
