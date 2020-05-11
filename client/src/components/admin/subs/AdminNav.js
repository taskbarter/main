import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = (props) => {
  return (
    <div className='container explore-container' id='explore-container'>
      <div className='task-list-section'>
        <Link to='/admin/'>
          <button
            className='btn btn-primary mr-2'
            disabled={props.selected === 0}
          >
            Main
          </button>
        </Link>
        <Link to='/admin/users'>
          <button
            className='btn btn-primary mr-2'
            disabled={props.selected === 1}
          >
            View Users
          </button>
        </Link>
        <Link to='/admin/activity'>
          <button className='btn btn-primary' disabled={props.selected === 2}>
            View Users Activity
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
