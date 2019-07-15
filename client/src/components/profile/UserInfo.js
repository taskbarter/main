import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';

class UserInfo extends Component {

  componentDidMount() {
    document.getElementById('body').className = 'login-body';
    document.getElementById('html').className = 'login-html';
  }
  componentWillUnmount() {
    document.getElementById('body').className = '';
    document.getElementById('html').className = '';
  }
  render() {
    return (

     <div>
        <form class="steps" accept-charset="UTF-8" enctype="multipart/form-data" novalidate="">
        <ul id="progressbar">
        <li class="active">User Information</li>
        <li>Personal Details</li>
        <li>Background Info</li>
        <li>Categories</li>
        <li>Verification</li>
     </ul>
     <fieldset>
     <div className='form-label-group'>
            <input
              type='FullName'
              id='fullname'
              className='form-control'
              placeholder='Full Name'
              required
              autoFocus={true}
            />
            <label htmlFor='email'> Full Name</label>
          </div>

    </fieldset>
     </form>
          <p className='mt-4 mb-1 text-muted text-center'>
            Taskbarter &copy; 2019
          </p>
          <p className='mt-0 mb-3 text-muted text-center'>
            Your information is ensured to be kept in the most secure way
            possible. For more, visit our <Link to='#'>Privacy Policy</Link>{' '}
            page.
          </p>
      </div>
    );
  }
}

  
  
export default UserInfo;
