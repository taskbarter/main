import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { userPersonalDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Messages extends Component {
  render() {
    return <div>Messages here</div>;
  }
}

export default Messages;
