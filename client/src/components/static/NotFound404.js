import React, { Component } from 'react';
import Footer from '../layout/Footer';
import HeaderOnlyLogo from '../layout/HeaderOnlyLogo';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import vector_404 from '../../style/inc/vector_404.svg';

class NotFound404 extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.auth.user ? <HeaderOnlyLogo /> : ''}
        <div className='taskv-loader error-msg-center'>
          <img src={vector_404} alt='404 Vector' className='vector-404' />
          You are not allowed to view this page.
          <Link className='clear-a mt-4' to='/'>
            <button className='btn btn-primary btn-sm'>
              Go back to Main Page
            </button>
          </Link>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, {})(NotFound404));
