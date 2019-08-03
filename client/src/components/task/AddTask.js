import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import CurrentBalanceCard from '../profile/CurrentBalanceCard';
import AddTaskHints from './AddTaskHints';
import Footer from '../layout/Footer';
import validate from '../../config/rules';
import { addTask } from '../../actions/taskAction';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      headline: '',
      requirement: '',
      duration: '',
      category: '',
      skills: '',
      points: 0,
      errors: {}
    };
  }

  onChange = e => {
    // if (validate(e.target.id, e.target.value) !== '') {
    //   document.getElementById(e.target.id).classList.add('is-invalid');
    // } else {
    //   document.getElementById(e.target.id).classList.remove('is-invalid');
    //   document.getElementById(e.target.id).classList.add('is-valid');
    // }
    this.setState({ [e.target.id]: e.target.value }); // same is req to work
  };

  onSubmit = async e => {
    e.preventDefault();
    const newTask = {
      headline: this.state.headline,
      description: this.state.description,
      duration: this.state.duration,
      category: this.state.category,
      skills: this.state.skills,
      points: this.state.points
    };

    this.props.addTask(newTask, this.props.history);
  };
  render() {
    const { user } = this.props.auth;
    // console.log(this.state);

    return (
      <div>
        <Navbar />
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <CurrentBalanceCard />
              <AddTaskHints />
            </div>

            <form onSubmit={this.onSubmit}>
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
                      value={this.state.headline}
                      id='headline'
                      onChange={e => this.onChange(e)}
                    />
                    <span className='max-chars'>* (Max 50 characters)</span>
                  </div>

                  <div className='add-task-input-details'>
                    <div className='form-group'>
                      <label htmlFor='addTaskDetails'>Requirement</label>
                      <textarea
                        className='form-control'
                        id='detail'
                        rows='5'
                        placeholder='Put all your Requirements here'
                        value={this.state.description}
                        id='description'
                        onChange={e => this.onChange(e)}
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
                      id='duration'
                      onChange={e => this.onChange(e)}
                    >
                      <option value=''>Choose...</option>
                      <option value='.3'>one to ten hours</option>
                      <option value='1'>less than 24 hours</option>
                      <option value='7'>less than a week</option>
                      <option value='30'>less than a month</option>
                    </select>
                    <span className='max-chars'>
                      * Choose the closest option{' '}
                    </span>
                  </div>
                  <div className='add-task-categories form-group'>
                    <label className='my-1 mr-2' htmlFor='category'>
                      Category
                    </label>
                    <select
                      className='custom-select my-1 mr-sm-2'
                      id='category'
                      onChange={e => this.onChange(e)}
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
                    <label htmlFor='skills'>Select Skills</label>
                    <select
                      multiple
                      className='form-control'
                      id='skills'
                      onChange={e => this.onChange(e)}
                    >
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
                    <label htmlFor='points'>Points Allocated</label>
                    <input
                      type='number'
                      id='points'
                      className='form-control'
                      aria-describedby='taskPointsHelp'
                      onChange={e => this.onChange(e)}
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
                      I confirm that the information provided in this task form
                      is my responsibility and it does not violate any of the{' '}
                      <a href='#'>terms & conditions</a> of Taskbarter.
                    </label>
                  </div>

                  <div className='task-button-submit'>
                    <button type='submit' className='btn add-task-btn'>
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
AddTask.propTypes = {
  auth: PropTypes.object.isRequired,
  addTask: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addTask }
)(AddTask);
