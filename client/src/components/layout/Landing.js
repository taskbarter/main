import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent_White.png';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    document.getElementById('body').className = 'landing-body';
  }

  componentWillUnmount() {
    if (localStorage.darkTheme) {
      document.getElementById('body').className = 'darktheme';
    } else {
      document.getElementById('body').className = '';
    }
  }
  render() {
    return (
      <div>
        <header className='fixed-top '>
          <nav className='navbar py-3' data-track-group='Global Header'>
            <Link to='/landing' className='float-left'>
              <img className='landing-logo' src={logo} alt='Taskbarter' />
            </Link>
            <div className='d-none d-md-block recommend' />
            <div className='float-right buttons'>
              <Link to='/login'>
                <div className='btn btn-sm btn-link text-white'>Log In</div>
              </Link>
              <Link to='/register'>
                <div className='btn btn-sm bg-white font-weight-bold'>
                  Sign Up
                </div>
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
                  <Link to='/register'>
                    <span className='btn btn-success btn-lg px-4'>
                      Sign Up – It’s Free!
                    </span>
                  </Link>{' '}
                </p>
              </div>
              <div className='col-lg-6 offset-lg-1'>
                {' '}
                <img
                  src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg'
                  width='582'
                  className='img-fluid'
                  alt='Cover'
                />{' '}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(Landing);
