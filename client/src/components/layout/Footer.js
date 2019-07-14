import React from 'react';
const Footer = props => {
  return (
    <div className='footer container row'>
      <span className='footer-copyrights col-md-4'>
        © 2019 Taskbarter. All Rights Reserved.
      </span>
      <span className='footer-links col-md-4 ml-auto'>
        <a href='#'>About</a>
        <a href='#'>Terms</a>
        <a href='#' id='report-problem'>
          Report
        </a>
      </span>
    </div>
  );
};

export default Footer;
