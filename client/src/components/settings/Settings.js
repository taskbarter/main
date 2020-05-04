import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, CustomInput } from 'reactstrap';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: '',
      isDarkThemeOn: localStorage.darkTheme,
      darkModeChangingState: false,
    };
  }
  componentDidMount() {
    this.setState({ isDarkThemeOn: localStorage.darkTheme });
  }
  onConvoClick = (id) => {};

  changeDarkMode = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      console.log('Dark theme turned on');
      this.setState(
        { isDarkThemeOn: 'true', darkModeChangingState: true },
        () => {
          localStorage.setItem('darkTheme', true);
          window.location.reload();
        }
      );
    } else {
      console.log('Dark theme turned off');
      this.setState(
        { isDarkThemeOn: 'false', darkModeChangingState: true },
        () => {
          localStorage.removeItem('darkTheme');
          window.location.reload();
        }
      );
    }
  };
  render() {
    return (
      <div className='container notif-container'>
        <div className='notif-section'>
          <div className='task-list-title'>Your Account Settings</div>

          <div className='row mt-4'>
            <div className='col-sm-2' style={{ marginTop: '7px' }}>
              {' '}
              Email{' '}
            </div>
            <div className='col-sm-10'>
              <input
                className='form-control'
                disabled={true}
                value={this.props.auth.user.email}
              />
            </div>
          </div>
          <div className='row mt-4 mb-4'>
            <div className='col-sm-2' style={{ marginTop: '7px' }}>
              {' '}
              Username{' '}
            </div>
            <div className='col-sm-10'>
              <input
                className='form-control'
                disabled={true}
                value={this.props.auth.user.name}
              />
            </div>
          </div>

          <label className='checkbox__label mt-4'>
            Dark Mode (Experimental){' '}
            {this.state.darkModeChangingState ? 'Changing...' : ''}
            <input
              data-v-68624b48=''
              type='checkbox'
              name='filter-dropdown-experience'
              value='d98c139f-5a36-4848-9230-02777a668e33'
              checked={this.state.isDarkThemeOn === 'true'}
              onChange={this.changeDarkMode}
              disabled={this.state.darkModeChangingState}
            />{' '}
            <span className='checkmark' style={{ top: '2px' }}></span>
          </label>

          <div className='silented-text'>
            Changing this info is not yet available.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socket_connection: state.socket.socket_connection,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Settings);
