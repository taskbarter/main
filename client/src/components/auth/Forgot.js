import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }
  componentDidMount() {
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
      email: this.state.email
    };
    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form className='form-signin'>
          <div className='text-center mb-4'>
            <a href='/'>
              <img
                className='mb-4 login-logo'
                src='inc/TaskbarterLogo/TaskbarterLogo_Transparent.png'
                alt=''
              />
            </a>
          </div>

          <div className='form-label-group'>
            <input
              type='email'
              id='inputEmail'
              className='form-control'
              placeholder='Email address'
              required
              autoFocus={true}
            />
            <label htmlFor='inputEmail'>Email address</label>
          </div>

          <button
            className='btn btn-lg btn-primary btn-block login-btn'
            type='submit'
          >
            Send Verification Link
          </button>
          <br />
          <div className='mt-2 text-center login-links'>
            <Link to='/login'>Login to your account</Link> |{' '}
            <Link to='/register'>Create an account</Link>
          </div>
          <p className='mt-4 mb-1 text-muted text-center'>
            Taskbarter &copy; 2019
          </p>
          <p className='mt-0 mb-3 text-muted text-center'>
            Your information is ensured to be kept in the most secure way
            possible. For more, visit our <a href='#'>Privacy Policy</a> page.
          </p>
        </form>
      </div>
    );
  }
}
export default Forgot;
