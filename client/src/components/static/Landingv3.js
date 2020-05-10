import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../../TaskBarterLogo_Transparent_White.png';
import logo from '../../TaskBarterLogo_Transparent.png';
import header_graphic from '../../style/inc/header_graphic_v2.png';
import barter_work from '../../style/inc/barter_work.svg';
import barter_bill from '../../style/inc/barter_bill.svg';
import barter_hire from '../../style/inc/barter_hire.svg';
import barter_swap from '../../style/inc/barter_swap.svg';
import arrows from '../../style/inc/arrows.png';
import { connect } from 'react-redux';
import '../../style/landingv3.css';
import '../../style/aos.css';

class Landingv3 extends Component {
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
    //document.getElementById('body').className = 'landing-body';
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
      <div className='landingv3'>
        <div className='site-wrap' id='home-section'>
          <div className='site-mobile-menu site-navbar-target'>
            <div className='site-mobile-menu-header'>
              <div className='site-mobile-menu-close mt-3'>
                <span className='icon-close2 js-menu-toggle'></span>
              </div>
            </div>
            <div className='site-mobile-menu-body'></div>
          </div>

          <header
            className='site-navbar py-4 js-sticky-header site-navbar-target'
            role='banner'
          >
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-3 col-md-3 col-xl-4  d-block'>
                  <h1 className='mb-0 site-logo'>
                    <span className='text-black h2 mb-0'>
                      <img
                        src={logo}
                        className='tb-logo'
                        alt='Taskbarter Logo'
                      />
                    </span>
                  </h1>
                </div>

                <div className='col-9 col-md-9 col-xl-8 main-menu'>
                  <nav
                    className='site-navigation position-relative text-right'
                    role='navigation'
                  >
                    <ul className='site-menu main-menu js-clone-nav mr-auto d-lg-block ml-0 pl-0'>
                      {/* <li>
                        <Link to='/login' className='nav-link not-imp-nav-link'>
                          Create an Account
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to='/login'
                          className='nav-link btn btn-primary get-started-nav'
                        >
                          Login Now
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className='col-6 col-md-9 d-inline-block d-lg-none ml-md-0'>
                  <a
                    href='#'
                    className='site-menu-toggle js-menu-toggle text-black float-right'
                  >
                    <span className='icon-menu h3'></span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          <div className='site-blocks-cover' style={{ overflow: 'hidden' }}>
            <div className='container' style={{ marginTop: '4rem' }}>
              <div className='row align-items-center justify-content-center'>
                <div
                  className='col-md-12'
                  style={{ position: 'relative' }}
                  data-aos='fade-up'
                  data-aos-delay='200'
                >
                  <img
                    src={header_graphic}
                    alt='Image'
                    className='img-fluid img-absolute'
                  />

                  <div
                    className='row mb-4'
                    data-aos='fade-up'
                    data-aos-delay='200'
                  >
                    <div className='col-lg-6 mr-auto hero-text-main'>
                      <h1>Exchange tasks for free!</h1>
                      <p className='mb-5'>
                        With Taskbarter, you can outsource the tasks you feel
                        most trouble in. — Only do what you feel most passionate
                        about!
                      </p>
                      <div>
                        <Link
                          to='/register'
                          className='btn btn-primary mr-2 mb-2'
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='feature-big'>
          <div className='container'>
            <div className='row site-section'>
              <div className='offset-lg-1 col-lg-5' data-aos='fade-right'>
                <img
                  src={barter_work}
                  alt='Image'
                  className='img-fluid barter-icons'
                />
              </div>
              <div className='col-lg-6 pl-lg-5 ml-auto mt-md-5'>
                <span className='step-count step-count-ex '>1</span>
                <h2 className='text-purp mt-4'>Find Work</h2>
                <p className='mb-4'>
                  Browse new tasks in the Explore section and start looking for
                  the tasks that you are most interested in. You can search by
                  Skills, Categories and Keywords that match your needs.
                </p>
              </div>
            </div>

            <div className='row site-section '>
              <div className='col-lg-3 order-1 order-lg-2' data-aos='fade-left'>
                <img
                  src={barter_bill}
                  alt='Image'
                  className='img-fluid barter-icons icon-right'
                />
              </div>
              <div className='offset-lg-1 col-lg-7 pr-lg-5 mr-auto mt-5 order-2 order-lg-1 mt-5-mobile-none'>
                <span className='step-count-1'>2</span>
                <h2 className='text-purp mt-4'>Earn Points</h2>
                <p className='mb-4'>
                  Taskbarter runs on Virtual Currency called Task Points. Each
                  task has a certain value defined by the task owner. Once you
                  complete a task, you will get decided task points.
                </p>
              </div>
            </div>

            <div className='row site-section'>
              <div className='offset-lg-1 col-lg-5' data-aos='fade-right'>
                <img
                  src={barter_hire}
                  alt='Image'
                  className='img-fluid barter-icons'
                />
              </div>
              <div className='col-lg-6 pl-lg-5 ml-auto mt-md-5'>
                <span className='step-count'>3</span>
                <h2 className='text-purp mt-4'>Hire People</h2>
                <p className='mb-4'>
                  Once you add a task using your task points, you will get work
                  proposals and you can short list applicants depending on their
                  skills and reviews. You can also negotiate the requirements
                  using our messaging service.
                </p>
              </div>
            </div>

            <div className='row site-section '>
              <div className='col-lg-3 order-1 order-lg-2' data-aos='fade-left'>
                <img
                  src={barter_swap}
                  alt='Image'
                  className='img-fluid barter-icons icon-right'
                />
              </div>
              <div className='offset-lg-1 col-lg-7 pr-lg-5 mr-auto mt-5 order-2 order-lg-1 mt-5-mobile-none'>
                <span className='step-count-1'>4</span>
                <h2 className='text-purp mt-4'>Barter Tasks</h2>
                <p className='mb-4'>
                  Once you get used to the system, you can start doing what you
                  love and leave the work that troubles you the most to other
                  people. You'll definitely find someone who loves to work on
                  the tasks you hate.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='cta-bottom' data-aos='fade-left'>
          <h2 className='text-purp mt-4 ' style={{ fontWeight: '200' }}>
            So what are you waiting for?
          </h2>
          <Link to='/register' className='btn btn-primary mt-4'>
            Start Bartering Tasks
          </Link>
        </div>

        <div className='footer py-5 text-center'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <p className='mb-0'>
                  Taskbarter Copyright &copy; 2020 All rights reserved
                </p>
                <p className='mb-0 mt-2'>
                  <Link to='/privacy-policy'>Privacy Policy</Link>
                  {' | '}
                  <a
                    href='https://docs.taskbarter.com/about-taskbarter/faq'
                    target='_blank'
                  >
                    FAQ
                  </a>
                  {' | '}
                  <a
                    href='https://github.com/taskbarter/main/issues'
                    target='_blank'
                  >
                    Report a Bug
                  </a>
                  {' | '}
                  <a href='mailto:taskbarter@gmail.com'>Contact us</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(Landingv3);
