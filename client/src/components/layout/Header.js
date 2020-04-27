import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getCurrentProfile } from '../../actions/profileAction';
import { createConnection } from '../../actions/socketActions';
import workspace_icon from '../../style/inc/work.svg';
import notif_icon from '../../style/inc/notif.svg';
import msg_icon from '../../style/inc/msg.svg';
import explore_icon from '../../style/inc/explore.svg';
import workspace_filled_icon from '../../style/inc/work_filled.svg';
import notif_filled_icon from '../../style/inc/notif_filled.svg';
import msg_filled_icon from '../../style/inc/msg_filled.svg';
import explore_filled_icon from '../../style/inc/explore_filled.svg';
import { addToast } from '../../actions/toasterActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileMenuOpened: false,
      itemsStyling: 'nav-items',
    };
  }

  onLogoutClick = (e) => {
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
      itemsStyling: newS,
    });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile().then(() => {
        this.props.addToast(
          `Welcome back ${this.props.profile.profile.first_name} ${this.props.profile.profile.second_name}`
        );
        //this.props.createConnection(this.props.auth);
      });
    }
  }

  onClickOnLogo = () => {
    this.props.history.push('/');
  };

  render() {
    const user_info = this.props.profile;
    if (this.props.auth.isAuthenticated) {
      return (
        <header className='main-header-v2'>
          <div className='header-container'>
            <img onClick={this.onClickOnLogo} src={logo} className='logo' />
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
                <span className='nav-item-header'>
                  <img
                    src={workspace_icon}
                    className='svg_icon icon_inactive'
                  ></img>
                  <img
                    src={workspace_filled_icon}
                    className='svg_icon icon_active'
                  ></img>
                </span>
                <p className='nav-item-text'>Workspace</p>
              </NavLink>
              <NavLink
                exact
                to='/explore'
                activeClassName='active'
                className='nav-item'
              >
                <span className='nav-item-header'>
                  <img
                    src={explore_icon}
                    className='svg_icon icon_inactive'
                  ></img>
                  <img
                    src={explore_filled_icon}
                    className='svg_icon icon_active'
                  ></img>
                </span>
                <p className='nav-item-text'>Explore</p>
              </NavLink>
              <NavLink
                exact
                to='/messages'
                activeClassName='active'
                className='nav-item'
              >
                <span className='nav-item-header'>
                  <img src={msg_icon} className='svg_icon icon_inactive'></img>
                  <img
                    src={msg_filled_icon}
                    className='svg_icon icon_active'
                  ></img>
                </span>
                <p className='nav-item-text'>Messages</p>
              </NavLink>

              <NavLink
                exact
                to='/notifications'
                activeClassName='active'
                className='nav-item'
              >
                <span className='nav-item-header'>
                  <img
                    src={notif_icon}
                    className='svg_icon icon_inactive'
                  ></img>
                  <img
                    src={notif_filled_icon}
                    className='svg_icon icon_active'
                  ></img>
                </span>
                <p className='nav-item-text'>Notifications</p>
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
                      <p className='name'>
                        {user_info.profile ? (
                          user_info.profile.first_name
                        ) : (
                          <i style={{ color: 'grey', fontWeight: 100 }}>
                            loading..
                          </i>
                        )}
                      </p>
                      <span className='name-sub'>
                        {user_info.profile
                          ? user_info.profile.pointsEarned -
                            user_info.profile.pointsSpent
                          : ''}{' '}
                        Pts
                      </span>
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
                  <Link exact='true' to='/me' className='link-no-style'>
                    <span className='profile-menu-item'>My Profile</span>
                  </Link>
                  <Link exact='true' to='/mytasks' className='link-no-style'>
                    <span className='profile-menu-item'>My Added Tasks</span>
                  </Link>
                  <Link exact='true' to='/mywork' className='link-no-style'>
                    <span className='profile-menu-item'>My Work</span>
                  </Link>

                  <Link exact='true' to='/settings' className='link-no-style'>
                    <span className='profile-menu-item'>Settings</span>
                  </Link>
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
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default withRouter(
  connect(mapStateToProps, {
    logoutUser,
    getCurrentProfile,
    createConnection,
    addToast,
  })(Header)
);
