import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Landing extends Component {
  componentDidMount() {
    document.getElementById('body').className = 'landing-body';
  }
  componentWillUnmount() {
    document.getElementById('body').className = '';
  }
  render() {
    return (
      <div>
        <header className='fixed-top '>
          <nav className='navbar py-3' data-track-group='Global Header'>
            <Link className='float-left' to='/landing'>
              <img
                className='landing-logo'
                src='inc/TaskbarterLogo/TaskbarterLogo_Transparent_White.png'
                alt=''
              />
            </Link>
            <div className='d-none d-md-block recommend' />
            <div className='float-right buttons'>
              <Link to='/login' className='btn btn-sm btn-link text-white'>
                Log In
              </Link>
              <Link
                to='/register'
                className='btn btn-sm bg-white font-weight-bold'
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        <section id='hero'>
          <div className='container pt-7 pb-6 text-white'>
            <div className='row align-items-center text-center text-md-left'>
              <div className='col-lg-5'>
                <h1>Taskbarter.com helps you exchange skills for free.</h1>
                <p className='lead'>
                  With Taskbarter, you can do what you feel most passionate
                  about and outsource the tasks you feel most problem in.
                </p>
                <p>
                  {' '}
                  <Link to='/register' class='btn btn-success btn-lg px-4'>
                    Sign Up – It’s Free!
                  </Link>{' '}
                </p>
              </div>
              <div claclassNamess='col-lg-6 offset-lg-1'>
                {' '}
                <img
                  src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg'
                  width='582'
                  class='img-fluid'
                />{' '}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Landing;
