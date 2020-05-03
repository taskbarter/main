import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: '',
    };
  }
  componentDidMount() {}
  onConvoClick = (id) => {};

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
          <div className='row mt-4'>
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
