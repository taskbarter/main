import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import '../../style/header.css';
import workspace_icon from '../../style/inc/work.svg';
import notif_icon from '../../style/inc/notif.svg';
import msg_icon from '../../style/inc/msg.svg';
import explore_icon from '../../style/inc/explore.svg';
import workspace_filled_icon from '../../style/inc/work_filled.svg';
import notif_filled_icon from '../../style/inc/notif_filled.svg';
import msg_filled_icon from '../../style/inc/msg_filled.svg';
import explore_filled_icon from '../../style/inc/explore_filled.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileMenuOpened: false,
      itemsStyling: 'nav-items'
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onMobMenuOpen = () => {
    let newS = 'nav-items';
    if (!this.state.isMobileMenuOpened) {
      newS += ' mobile-expand';
    }
    this.setState({
      isMobileMenuOpened: !this.state.isMobileMenuOpened,
      itemsStyling: newS
    });
  };

  render() {
    const user_info = this.props.auth.user;
    if (this.props.auth.isAuthenticated) {
      return (
        <header class='main-header-v2'>
          <div class='header-container'>
            <img src={logo} className='logo' />
            <span className={this.state.itemsStyling}>
              <a onClick={this.onMobMenuOpen} className='menu-toggler-close'>
                <span className='navbar-toggler-icon'>
                  <i className='fas fa-times' />
                </span>
              </a>
              <NavLink
                exact
                to='/dashboard'
                activeClassName='active'
                className='nav-item'
              >
                <span class='nav-item-header'>
                  <img
                    src={workspace_icon}
                    class='svg_icon icon_inactive'
                  ></img>
                  <img
                    src={workspace_filled_icon}
                    class='svg_icon icon_active'
                  ></img>
                </span>
                <p class='nav-item-text'>Workspace</p>
              </NavLink>
              <NavLink
                exact
                to='/explore'
                activeClassName='active'
                className='nav-item'
              >
                <span class='nav-item-header'>
                  <img src={explore_icon} class='svg_icon icon_inactive'></img>
                  <img
                    src={explore_filled_icon}
                    class='svg_icon icon_active'
                  ></img>
                </span>
                <p class='nav-item-text'>Explore</p>
              </NavLink>
              <NavLink
                exact
                to='/messages'
                activeClassName='active'
                className='nav-item'
              >
                <span class='nav-item-header'>
                  <img src={msg_icon} class='svg_icon icon_inactive'></img>
                  <img src={msg_filled_icon} class='svg_icon icon_active'></img>
                </span>
                <p class='nav-item-text'>Messages</p>
              </NavLink>

              <NavLink
                exact
                to='/notifications'
                activeClassName='active'
                className='nav-item'
              >
                <span class='nav-item-header'>
                  <img src={notif_icon} class='svg_icon icon_inactive'></img>
                  <img
                    src={notif_filled_icon}
                    class='svg_icon icon_active'
                  ></img>
                </span>
                <p class='nav-item-text'>Notifications</p>
              </NavLink>
              <div className='nav-profile dropdown'>
                <a
                  className=''
                  role='button'
                  id='dropdown03'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <div className='profile'>
                    <span className='avatar'>
                      <img
                        src='/inc/Mohsin_DP.jpg'
                        className='avatar-img'
                      ></img>
                    </span>
                    <span className='text'>
                      <p className='name'>{user_info.first_name}</p>
                      <span className='name-sub'>225 Pts</span>
                    </span>
                    <span>
                      <i className='fas fa-caret-down' />
                    </span>
                  </div>
                </a>

                <div
                  className='dropdown-menu dropdown-menu-right profile-menu'
                  aria-labelledby='dropdown03'
                >
                  <span className='profile-menu-item'>My Profile</span>
                  <span className='profile-menu-item'>Settings</span>
                  <hr />
                  <a onClick={this.onLogoutClick} className='profile-menu-item'>
                    Logout
                  </a>
                </div>
              </div>
            </span>
            <a className='menu-toggler-open' onClick={this.onMobMenuOpen}>
              {' '}
              <span className='navbar-toggler-icon'>
                <i className='fas fa-bars' />
              </span>
            </a>
          </div>
        </header>
      );
    } else {
      return <span></span>;
    }
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
