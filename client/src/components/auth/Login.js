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
      errMsg: '',
      isLoading: false
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
    this.setState({
      errors: {
        empty: 'The fields are empty'
      }
    });
    this.props.location.search.v !== undefined &&
      console.log(this.props.location.search.v);
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
    if (this.state.email.length < 1) {
      this.setState({
        errMsg: 'You must enter Username or Email'
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        errMsg: 'Your password seems invalid'
      });
      return;
    }
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
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
          {this.props.location.search.v !== undefined ? (
            <div className='alert alert-success text-center'>
              <strong>Success: </strong> verification email has been sent at
              your email address
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
            {isLoading ? loader : 'Login'}
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
