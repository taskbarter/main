import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import CurrentBalanceCard from '../profile/CurrentBalanceCard';
import AddTaskHints from './AddTaskHints';
import Footer from '../layout/Footer';
import { addTask } from '../../actions/taskAction';
import validate from '../../config/rules';
import AlertMsg from '../utils/AlertMsg';

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
      errors: {},
      points_for_task: 1,
      error: {
        msg: '',
        type: 0
      },
      areTermsAccepted: false,
      isAccepted: false
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
    if (e.target.id === 'points' && parseInt(e.target.value) < 1) {
      this.setState({ points_for_task: 1 });
    } else if (e.target.id === 'points' && parseInt(e.target.value) < 40) {
      this.setState({ points_for_task: parseInt(e.target.value) });
    }

    if (e.target.id === 'skills') {
      let select = e.target;
      let values = [].filter
        .call(select.options, o => o.selected)
        .map(o => o.value);
      this.setState({ skills: values });
      if (values.length > 3) {
        document.getElementById(e.target.id).classList.add('is-invalid');
      } else {
        document.getElementById(e.target.id).classList.remove('is-invalid');
      }
      return;
    }

    if (e.target.id === 'gridCheck1') {
      if (e.target.checked) {
        this.setState({
          areTermsAccepted: true
        });
      } else {
        this.setState({
          error: { msg: 'You must agree to the terms to continue', type: 0 }
        });
      }
      return;
    }

    if (this.state[e.target.id] !== '') {
      let err = validate(e.target.id, this.state[e.target.id]);
      this.setState({
        error: {
          msg: err,
          type: 0
        }
      });
      if (err !== '') {
        document.getElementById(e.target.id).classList.add('is-invalid');
      } else {
        document.getElementById(e.target.id).classList.remove('is-invalid');
      }
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    const {
      headline,
      description,
      skills,
      areTermsAccepted,
      category,
      duration
    } = this.state;
    let err = '';
    err =
      validate('headline', headline) || validate('description', description);

    if (err !== '') {
      this.setState({
        error: { msg: err, type: 0 }
      });
    }

    if (skills.length > 3) {
      err = 'You can only select 3 skills at max.';
      this.setState({
        error: { msg: err, type: 0 }
      });
    }

    if (skills.length === 0) {
      err = 'You must select at least one skill to continue.';
      this.setState({
        error: { msg: err, type: 0 }
      });
    }

    if (!areTermsAccepted) {
      err =
        'You must agree to our terms and condition before you can submit a task.';
      this.setState({
        error: {
          msg: err,
          type: 0
        }
      });
    }

    if (duration === '') {
      err = 'You must select a duration to proceed.';
      this.setState({
        error: {
          msg: err,
          type: 0
        }
      });
    }

    if (category === '') {
      err = 'You must select a category to continue';
      this.setState({
        error: {
          msg: err,
          type: 0
        }
      });
    }

    //err = this.state.error.msg;

    if (err !== '') {
      window.scrollTo(0, 0);
      return false;
    } else {
      const newTask = {
        headline: this.state.headline,
        description: this.state.description,
        duration: this.state.duration,
        category: this.state.category,
        skills: this.state.skills,
        points: this.state.points
      };

      if (this.props.addTask(newTask, this.props.history)) {
        this.setState({
          isAccepted: true,
          error: {
            msg:
              'Your task has been successfully added and is public for everyone on Taskbarter.',
            type: 2
          }
        });
      }
    }
  };
  render() {
    const { user } = this.props.auth;
    // console.log(this.state);
    return (
      <div>
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              {this.state.error.msg !== '' ? (
                <AlertMsg
                  type={this.state.error.type}
                  msg={this.state.error.msg}
                />
              ) : (
                ''
              )}
              <CurrentBalanceCard />
              <AddTaskHints />
            </div>

            <div className='col-md-8 order-md-1'>
              {!this.state.isAccepted ? (
                <div className='card card-body mb-2'>
                  <div className='add-task-heading'>Add New Task</div>

                  <form onSubmit={this.onSubmit}>
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
                        value={this.state.points_for_task}
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
                        onChange={e => this.onChange(e)}
                      />
                      <label className='form-check-label' htmlFor='gridCheck1'>
                        I confirm that the information provided in this task
                        form is my responsibility and it does not violate any of
                        the <a href='#'>terms & conditions</a> of Taskbarter.
                      </label>
                    </div>

                    <div className='task-button-submit'>
                      <button type='submit' className='btn add-task-btn'>
                        Add Task
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className='card card-body mb-2'>
                  <div className='text-center mg-32'>
                    <span className='tick-mark-completion'>
                      <i
                        class='fa fa-check little-text-shadow'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  <div className='text-center fs-20 '>
                    Your task has been added!
                  </div>
                </div>
              )}
            </div>
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
export default connect(mapStateToProps, { addTask })(AddTask);
