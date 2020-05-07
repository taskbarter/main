import React from 'react';
import { Link } from 'react-router-dom';
const Footer = (props) => {
  return (
    <div className='footer container row'>
      <span className='footer-copyrights col-md-4'>
        © 2020 Taskbarter. All Rights Reserved.
      </span>
      <span className='footer-links col-md-4 ml-auto'>
        <a href='#'>About</a>
        <Link to='/privacy-policy'>Privacy</Link>
        <a href='#' id='report-problem'>
          Report
        </a>
      </span>
    </div>
  );
};

export default Footer;
