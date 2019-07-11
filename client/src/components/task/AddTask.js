import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import CurrentBalanceCard from '../profile/CurrentBalanceCard';
import AddTaskHints from './AddTaskHints';

class AddTask extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Navbar />
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <CurrentBalanceCard />
              <AddTaskHints />
            </div>

            <div className='col-md-8 order-md-1'>
              <div className='card card-body mb-2'>
                <div className='add-task-heading'>Add New Task</div>

                <div className='add-task-input-headline'>
                  I want someone to{' '}
                  <input
                    className='form-control'
                    type='text'
                    placeholder='put headline here'
                    width='100px'
                  />
                  <span className='max-chars'>* (Max 50 characters)</span>
                </div>

                <div className='add-task-input-details'>
                  <div className='form-group'>
                    <label htmlFor='addTaskDetails'>Requirements</label>
                    <textarea
                      className='form-control'
                      id='addTaskDetails'
                      rows='5'
                      placeholder='Put all your requirements here'
                    />
                  </div>
                  <span className='max-chars'>* (Max 4000 characters)</span>
                </div>

                <div className='add-task-duration form-group'>
                  <label htmlFor='state'>Duration</label>
                  <select
                    className='custom-select d-block w-100'
                    id='state'
                    required=''
                  >
                    <option value=''>Choose...</option>
                    <option>one to ten hours</option>
                    <option>less than 24 hours</option>
                    <option>less than a week</option>
                    <option>less than a month</option>
                  </select>
                  <span className='max-chars'>
                    * Choose the closest option{' '}
                  </span>
                </div>
                <div className='add-task-categories form-group'>
                  <label className='my-1 mr-2' htmlFor='addTaskCategory'>
                    Category
                  </label>
                  <select
                    className='custom-select my-1 mr-sm-2'
                    id='addTaskCategory'
                  >
                    <option defaultValue>Choose...</option>
                    <option>Computer Programming</option>
                    <option>Content Writing</option>
                    <option>Search Engine Optimization</option>
                    <option>Web Development</option>
                    <option>Arts & Design</option>
                    <option>Research Work</option>
                    <option>Engineering</option>
                    <option>Data Entry</option>
                    <option>Web Design</option>
                    <option>Gaming</option>
                    <option>Social Media Marketing</option>
                    <option>Logo/Banner Design</option>
                  </select>
                </div>
                <div className='add-task-categories form-group'>
                  <label htmlFor='addTaskSkills'>Select Skills</label>
                  <select multiple className='form-control' id='addTaskSkills'>
                    <option>Adobe Photoshop</option>
                    <option>C++</option>
                    <option>Javascript</option>
                    <option>ASP.NET</option>
                    <option>Powerpoint</option>
                    <option>MS Excel</option>
                    <option>Oracle DB</option>
                    <option>Theme Design</option>
                    <option>HTML/CSS</option>
                    <option>MERN Developer</option>
                    <option>Search Engine Optimization</option>
                    <option>Wordpress Development</option>
                  </select>
                  <span className='max-chars'>
                    * Choose 3 most related skills{' '}
                  </span>
                </div>

                <div className='add-task-input-points form-group'>
                  <label htmlFor='addTaskPoints'>Points Allocated</label>
                  <input
                    type='number'
                    id='addTaskPoints'
                    className='form-control'
                    aria-describedby='taskPointsHelp'
                  />
                  <small id='taskPointsHelp' className='text-muted'>
                    Must depict the requirements you mentioned
                  </small>
                </div>

                <div className='task-points-confirm form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='gridCheck1'
                  />
                  <label className='form-check-label' htmlFor='gridCheck1'>
                    I confirm that the information provided in this task form is
                    my responsibility and it does not violate any of the{' '}
                    <a href='#'>terms & conditions</a> of Taskbarter.
                  </label>
                </div>

                <div className='task-button-submit'>
                  <button className='btn add-task-btn'>Add Task</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
AddTask.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AddTask);
