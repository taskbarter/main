import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
  render() {
    return (
      <span>
        <nav className='navbar navbar-expand-lg fixed-top tb-navbar'>
          <Link to='/'>
            {' '}
            <img
              src='inc/TaskbarterLogo/TaskbarterLogo_Transparent.png'
              className='logo navbar-brand mr-auto mr-lg-0'
            />{' '}
          </Link>
          <button
            className='navbar-toggler p-0 border-0'
            type='button'
            data-toggle='offcanvas'
          >
            <span className='navbar-toggler-icon'>
              <i className='fas fa-bars' />
            </span>
          </button>
        </nav>
      </span>
    );
  }
}
export default Navbar;
