import React, { Component } from 'react';
import AdminNav from './subs/AdminNav';

class Admin extends Component {
  render() {
    return (
      <div>
        <AdminNav selected={0} />
        <div className='container explore-container' id='explore-container'>
          <div className='task-list-section'>Select an option.</div>
        </div>
      </div>
    );
  }
}

export default Admin;
