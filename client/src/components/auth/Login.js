import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, loginUsingToken } from '../../actions/authActions';
import logo from '../../TaskBarterLogo_Transparent.png';
import GoogleLogin from './subs/GoogleLogin';
import FacebookLogin from './subs/FacebookLogin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      errMsg: '',
      isLoading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        isLoading: false,
      });
    }
  }
  getParams(location) {
    const searchParams = new URLSearchParams(location.search);
    return {
      v: searchParams.get('v') || '',
      token: searchParams.get('token') || '',
    };
  }
  componentDidMount() {
    if (this.getParams(this.props.location).token) {
      this.props.loginUsingToken(this.getParams(this.props.location).token);
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    document.getElementById('body').className = 'login-body';
    document.getElementById('html').className = 'login-html';
    this.setState({
      errors: {
        empty: 'The fields are empty',
      },
    });
  }
  componentWillUnmount() {
    if (localStorage.darkTheme) {
      document.getElementById('body').className = 'darktheme';
    } else {
      document.getElementById('body').className = '';
    }
    document.getElementById('html').className = '';
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.email.length < 1) {
      this.setState({
        errMsg: 'You must enter Username or Email',
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        errMsg: 'Your password seems invalid',
      });
      return;
    }
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({
      isLoading: true,
    });
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    var isLoading = false;
    if (Object.entries(errors).length !== 0) {
      isLoading = false;
    } else {
      isLoading = true;
    }

    const loader = (
      <div className='lds-ring'>
        <div />
        <div />
        <div />
        <div />
      </div>
    );

    const errMsg =
      this.state.errMsg ||
      errors.passwordincorrect ||
      errors.emailnotfound ||
      errors.usernamenotfound ||
      errors.emailnotverified;

    return (
      <div>
        <form className='form-signin' noValidate onSubmit={this.onSubmit}>
          <div className='text-center mb-4'>
            <Link to='/'>
              <img className='mb-4 login-logo' src={logo} alt='' />
            </Link>
          </div>
          {errMsg ? (
            <div className='alert alert-danger text-center'>
              <strong>Failure: </strong>{' '}
              <span dangerouslySetInnerHTML={{ __html: errMsg }} />
            </div>
          ) : null}
          {this.getParams(this.props.location).v === '1' ? (
            <div className='alert alert-success text-center'>
              <strong>Success: </strong> verification email has been sent
            </div>
          ) : (
            ''
          )}
          {this.getParams(this.props.location).v === '3' ? (
            <div className='alert alert-danger text-center'>
              <strong>Failure: </strong> Either you don't have an account or
              there is some issue in your Google login.
            </div>
          ) : null}
          {this.getParams(this.props.location).v === '2' ? (
            <div className='alert alert-success text-center'>
              <strong>Success: </strong> Your email has been verified. Please
              login again to continue
            </div>
          ) : (
            ''
          )}
          <div className='form-label-group'>
            <input
              onChange={this.onChange}
              value={this.state.email}
              type='email'
              id='email'
              className='form-control'
              placeholder='Email or Username'
              required
              autoFocus={true}
            />
            <label htmlFor='email'>Email or Username</label>
          </div>

          <div className='form-label-group'>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id='password'
              type='password'
              className='form-control'
              placeholder='Password'
              required
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div className='checkbox mb-3'>
            <label>
              <input type='checkbox' value='remember-me' /> Keep me logged in
            </label>
          </div>
          <button
            className='btn btn-lg btn-primary btn-block login-btn'
            type='submit'
          >
            {this.state.isLoading ? loader : 'Login'}
          </button>

          <br />
          <div className='mt-2 text-center login-links'>
            <Link to='/forgot'>Forgot Password</Link> |{' '}
            <Link to='/register'>Create an account</Link>
          </div>
          <div className='login-sep'>or</div>
          <div className='google-login'>
            <GoogleLogin />
            <FacebookLogin />
          </div>
          <p className='mt-4 mb-1 text-muted text-center'>
            Taskbarter &copy; 2020
          </p>
          <p className='mt-0 mb-3 text-muted text-center'>
            Your information is ensured to be kept in the most secure way
            possible. For more, visit our{' '}
            <Link to='/privacy-policy'>Privacy Policy</Link> page.
          </p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser, loginUsingToken })(Login);
