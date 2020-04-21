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

class HeaderOnlyLogo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileMenuOpened: false,
      itemsStyling: 'nav-items',
    };
  }
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

  componentDidMount() {}

  onClickOnLogo = () => {
    this.props.history.push('/');
  };

  render() {
    if (!this.props.auth.isAuthenticated) {
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

HeaderOnlyLogo.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default withRouter(
  connect(mapStateToProps, { logoutUser, getCurrentProfile, createConnection })(
    HeaderOnlyLogo
  )
);
