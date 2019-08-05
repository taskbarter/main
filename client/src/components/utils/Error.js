import React from 'react';

const ShowMsg = props => {
  if (!props.msg || props.msg === '') {
    return '';
  }
  switch (props.type) {
    case 0: //ERROR
      return <div>{props.msg}</div>;
    case 1: //WARNING
      return <div>{props.msg}</div>;
    case 2: //Success
      return <div>{props.msg}</div>;
  }
};
