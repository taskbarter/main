import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <span>
        <nav className='navbar navbar-expand-lg fixed-top tb-navbar'>
          <a href='/'>
            {' '}
            <img
              src={logo}
              className='logo navbar-brand mr-auto mr-lg-0'
            />{' '}
          </a>
          <button
            className='navbar-toggler p-0 border-0'
            type='button'
            data-toggle='offcanvas'
          >
            <span className='navbar-toggler-icon'>
              <i className='fas fa-bars' />
            </span>
          </button>

          <div
            className='navbar-collapse offcanvas-collapse'
            id='navbarsExampleDefault'
          >
            <ul className='navbar-nav mr-auto' />
            <form className='form-inline my-2 my-lg-0 search-bar'>
              <input
                className='form-control mr-sm-2 search-form'
                type='text'
                placeholder='Search tasks'
                aria-label='Search'
                width='100px'
              />
              <button
                className='btn btn-primary my-2 my-sm-0 search-button'
                type='submit'
              >
                <i className='fas fa-search search-icon' />
              </button>
            </form>

            <div className='dropdown'>
              <a
                href='#'
                role='button'
                id='dropdown03'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <div className='nav-message'>
                  <i className='fas fa-envelope nav-icon nav-msg-icon' />
                  <span className='badge badge-danger message-badge-2'>4</span>
                </div>
              </a>
              <div
                className='dropdown-menu dropdown-menu-right'
                aria-labelledby='dropdown03'
              >
                <div className='message-dropdown-heading'>Messages (4)</div>
                <div className=' scrollable-menu mt-2'>
                  <a className='dropdown-item' href='#'>
                    Message1
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message2
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message3
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message1
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message2
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message3
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message1
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message2
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Message3
                  </a>
                </div>
              </div>
            </div>

            <div className='dropdown'>
              <a
                href='#'
                role='button'
                id='dropdown04'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <div className='nav-notification'>
                  <i className='fas fa-bell nav-icon nav-notif-icon' />
                  <span className='badge badge-danger message-badge-2'>11</span>
                </div>
              </a>
              <div
                className='dropdown-menu dropdown-menu-right'
                aria-labelledby='dropdown04'
              >
                <div className='message-dropdown-heading'>
                  Notifications (11)
                </div>
                <div className=' scrollable-menu mt-2'>
                  <a className='dropdown-item' href='#'>
                    Notification 0
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 1
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 2
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 3
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 4
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 5
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 6
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 7
                  </a>
                  <div className='dropdown-divider' />
                  <a className='dropdown-item' href='#'>
                    Notification 8
                  </a>
                </div>
              </div>
            </div>

            <div className='dropdown'>
              <a
                href='#'
                role='button'
                id='dropdown01'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <div className='nav-user-dp ml-2 nav-icon'>
                  <i className='fas fa-user' />
                </div>
              </a>
              <div
                className='dropdown-menu dropdown-menu-right'
                aria-labelledby='dropdown01'
              >
                <a className='dropdown-item' href='#'>
                  See Points
                  <span className='badge badge-pill bg-light align-text-bottom points-badge-dd'>
                    124
                  </span>
                </a>
                <a className='dropdown-item' href='#'>
                  Public Profile
                </a>
                <a className='dropdown-item' href='#'>
                  My Added Tasks
                </a>
                <a className='dropdown-item' href='#'>
                  My Account
                </a>
                <a onClick={this.onLogoutClick} className='dropdown-item'>
                  Logout
                </a>
              </div>
            </div>

            <div className='mobile-menu d-flex justify-content-center'>
              <div className='nav-notification-mobile mr-2'>
                <i className='fas fa-bell nav-icon nav-notif-icon' />
                <span className='badge badge-danger message-badge-2'>11</span>
              </div>

              <div className='nav-message-mobile mr-2'>
                <i className='fas fa-envelope nav-icon nav-msg-icon' />
                <span className='badge badge-danger message-badge-2'>4</span>
              </div>

              <a
                id='dropdown02'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='true'
              >
                <div className='nav-message-mobile'>
                  <i className='fas fa-user nav-icon nav-msg-icon' />
                </div>
              </a>

              <div
                className='dropdown-menu mobile-dropdown'
                aria-labelledby='dropdown02'
              >
                <a className='dropdown-item' href='#'>
                  See Points{' '}
                  <span className='badge badge-pill bg-light align-text-bottom points-badge-dd'>
                    124
                  </span>
                </a>
                <a className='dropdown-item' href='#'>
                  Public Profile
                </a>
                <a className='dropdown-item' href='#'>
                  My Added Tasks
                </a>
                <a className='dropdown-item' href='#'>
                  My Account
                </a>
                <a className='dropdown-item' onClick={this.onLogoutClick}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className='nav-scroller bg-white box-shadow nav-submenu'>
          <nav className='nav nav-underline'>
            <Link to='/dashboard' className='nav-link active'>
              Dashboard
            </Link>

            <a className='nav-link' href='#'>
              Search Tasks
            </a>

            <a className='nav-link' href='#'>
              Pending Tasks &nbsp;
              <span className='badge badge-pill bg-light align-text-bottom'>
                27
              </span>
            </a>
            <a className='nav-link' href='#'>
              Explore
            </a>
            <a className='nav-link' href='#' style={{ marginRight: 'auto' }}>
              Your Profile
            </a>

            <a className='nav-link points-submenu' href='#'>
              124 <span className='tp-curr'>TP</span>
            </a>
          </nav>
        </div>
      </span>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
