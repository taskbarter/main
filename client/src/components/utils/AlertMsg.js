import React from 'react';

const AlertMsg = props => {
  if (!props.msg || props.msg === '') {
    return '';
  }
  switch (props.type) {
    case 0: //ERROR
      return (
        <div
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          {props.msg}
        </div>
      );
    case 1: //WARNING
      return (
        <div
          className='alert alert-warning alert-dismissible fade show'
          role='alert'
        >
          {props.msg}
        </div>
      );
    case 2: //SUCCESS
      return (
        <div
          className='alert alert-success alert-dismissible fade show'
          role='alert'
        >
          {props.msg}
        </div>
      );
  }
};

export default AlertMsg;
