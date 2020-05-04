import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../../TaskBarterLogo_Transparent_White.png';
import logo from '../../TaskBarterLogo_Transparent.png';
import header_graphic from '../../style/inc/header_graphic.png';
import arrows from '../../style/inc/arrows.png';
import { connect } from 'react-redux';
import '../../style/landingv2.css';

class Landingv2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileMenuOpened: false,
      itemsStyling: 'nav-items',
    };
  }
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
  render() {
    return (
      <div className='landingv2'>
        <header className='main-header-v2'>
          <div className='header-container'>
            <img onClick={this.onClickOnLogo} src={logo} className='logo' />
            <span className={this.state.itemsStyling}>
              <a onClick={this.onMobMenuOpen} className='menu-toggler-close'>
                <span className='navbar-toggler-icon'>
                  <i className='fas fa-times' />
                </span>
              </a>

              <Link className='nav-item menu-btn' to='/login'>
                Login
              </Link>
              <Link className='nav-item menu-btn2' to='/register'>
                Sign Up
              </Link>
            </span>
            <a className='menu-toggler-open' onClick={this.onMobMenuOpen}>
              {' '}
              <span className='navbar-toggler-icon'>
                <i className='fas fa-bars' />
              </span>
            </a>
          </div>
        </header>

        <main className='home-main'>
          <img src={arrows} className='home-liver' />
          <section className='first-section'>
            <div className='cta-part'>
              <div className='cta'>
                <h1 className='cta1'>Get your tasks done!</h1>
                <div className='cta-sub'>
                  <h2 className='subheader'>
                    Outsource the tasks you feel most trouble in — do what you
                    love.{' '}
                  </h2>
                  <div className='cta-action'>
                    <Link to='/register' className='clear-a'>
                      <button className='cta-btn'>Get Started</button>
                    </Link>
                  </div>
                  <p className='cta-bottom'>
                    Already have an account?{' '}
                    <Link to='/login' className='clear-a'>
                      {' '}
                      Login now.{' '}
                    </Link>
                  </p>
                </div>
              </div>

              <div className='img-part'>
                <div className='hero-img'>
                  <img src={header_graphic} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(Landingv2);
