import React from 'react';
import { Link } from 'react-router-dom';
const Footer = (props) => {
  return (
    <div className='footer container row'>
      <span className='footer-copyrights col-md-4'>
        © 2020 Taskbarter. All Rights Reserved.
      </span>
      <span className='footer-links col-md-4 ml-auto'>
        <a href='https://docs.taskbarter.com/'>About</a>
        <Link to='/privacy-policy'>Privacy</Link>
        <a href='https://forms.gle/oQUnBDPh9K3x2JWA9' id='report-problem'>
          Report a bug
        </a>
      </span>
    </div>
  );
};

export default Footer;
