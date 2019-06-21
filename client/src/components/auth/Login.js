import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import logo from '../../TaskBarterLogo_Transparent.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      errMsg: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    document.getElementById('body').className = 'login-body';
    document.getElementById('html').className = 'login-html';
  }
  componentWillUnmount() {
    document.getElementById('body').className = '';
    document.getElementById('html').className = '';
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    const errMsg =
      this.state.errMsg || errors.passwordincorrect || errors.emailnotfound;
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
              <strong>Error: </strong> {errMsg}
            </div>
          ) : null}
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
            Login
          </button>
          <br />
          <div className='mt-2 text-center login-links'>
            <Link to='/forgot'>Forgot Password</Link> |{' '}
            <Link to='/register'>Create an account</Link>
          </div>
          <p className='mt-4 mb-1 text-muted text-center'>
            Taskbarter &copy; 2019
          </p>
          <p className='mt-0 mb-3 text-muted text-center'>
            Your information is ensured to be kept in the most secure way
            possible. For more, visit our <Link to='/'>Privacy Policy</Link>{' '}
            page.
          </p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
