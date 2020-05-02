import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import CurrentBalanceCard from '../profile/CurrentBalanceCard';
import AddTaskHints from './AddTaskHints';
import Footer from '../layout/Footer';
import { addTask } from '../../actions/taskAction';
import { getCurrentProfile } from '../../actions/profileAction';
import validate from '../../config/rules';
import categories from '../../config/categories';
import skills from '../../config/skills';
import AlertMsg from '../utils/AlertMsg';
import { useQuill } from 'react-quilljs';
import DescriptionEditor from './subs/DescriptionEditor';
import filter from 'lodash/filter';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      headline: '',
      requirement: '',
      quillObj: {},
      requirementRaw: '',
      duration: '',
      category: '',
      skills: '',
      points: 0,
      errors: {},
      points_for_task: 1,
      error: {
        msg: '',
        type: 0,
      },
      areTermsAccepted: false,
      isAccepted: false,
      description: '',
      sending_state: false,
      search_skills_text: '',
      filtered_skills: [],
    };
  }

  componentDidMount() {
    this.setState({
      filtered_skills: skills,
    });
  }

  onChange = (e) => {
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
        .call(select.options, (o) => o.selected)
        .map((o) => o.value);
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
          areTermsAccepted: true,
        });
      } else {
        this.setState({
          error: { msg: 'You must agree to the terms to continue', type: 0 },
        });
      }
      return;
    }

    if (this.state[e.target.id] !== '') {
      let err = validate(e.target.id, this.state[e.target.id]);
      this.setState({
        error: {
          msg: err,
          type: 0,
        },
      });
      if (err !== '') {
        document.getElementById(e.target.id).classList.add('is-invalid');
      } else {
        document.getElementById(e.target.id).classList.remove('is-invalid');
      }
    }
  };

  onAssignQuillObj = (quillObj) => {
    this.setState({
      quillObj: quillObj,
    });
  };

  onAddPoints = (e) => {
    e.preventDefault();
    if (this.state.points_for_task < 40) {
      this.setState({
        points_for_task: this.state.points_for_task + 1,
        points: this.state.points_for_task + 1,
      });
    }
  };
  onSubPoints = (e) => {
    e.preventDefault();
    if (this.state.points_for_task > 1) {
      this.setState({
        points_for_task: this.state.points_for_task - 1,
        points: this.state.points_for_task - 1,
      });
    }
  };

  handleFocus = (event) => event.target.select();

  onSearchSkillsSearch = (e) => {
    let tempArr = [];
    tempArr = filter(skills, (skill) => {
      return (
        skill.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
      );
    });
    this.setState({
      search_skills_text: e.target.value,
      filtered_skills: tempArr,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      headline,
      skills,
      areTermsAccepted,
      category,
      duration,
    } = this.state;

    const description = this.state.quillObj.getText();

    let err = '';
    err =
      validate('headline', headline) || validate('description', description);

    if (err !== '') {
      this.setState({
        error: { msg: err, type: 0 },
      });
    }

    if (skills.length > 3) {
      err = 'You can only select 3 skills at max.';
      this.setState({
        error: { msg: err, type: 0 },
      });
    }

    if (skills.length === 0) {
      err = 'You must select at least one skill to continue.';
      this.setState({
        error: { msg: err, type: 0 },
      });
    }

    let currentPoints = 0;
    if (this.props.profile.profile) {
      currentPoints =
        this.props.profile.profile.pointsEarned -
        this.props.profile.profile.pointsSpent;
    }

    if (this.state.points > currentPoints) {
      err = `You do no have sufficient points to add this task.`;
      this.setState({
        error: {
          msg: err,
          type: 0,
        },
      });
    }

    if (!areTermsAccepted) {
      err =
        'You must agree to our terms and condition before you can submit a task.';
      this.setState({
        error: {
          msg: err,
          type: 0,
        },
      });
    }

    if (duration === '') {
      err = 'You must select a duration to proceed.';
      this.setState({
        error: {
          msg: err,
          type: 0,
        },
      });
    }

    if (category === '') {
      err = 'You must select a category to continue';
      this.setState({
        error: {
          msg: err,
          type: 0,
        },
      });
    }

    //err = this.state.error.msg;

    if (err !== '') {
      window.scrollTo(0, 0);
      return false;
    } else {
      const newTask = {
        headline: this.state.headline,
        description: this.state.quillObj.root.innerHTML,
        duration: this.state.duration,
        category: this.state.category,
        skills: this.state.skills,
        points: this.state.points,
      };
      this.setState(
        {
          sending_state: true,
        },
        () => {
          this.props
            .addTask(newTask, this.props.history)
            .then((isSuccessful) => {
              if (isSuccessful) {
                window.scrollTo(0, 0);
                this.setState({
                  isAccepted: true,
                  error: {
                    msg:
                      'Your task has been successfully added and is public for everyone on Taskbarter.',
                    type: 2,
                  },
                });
                this.props.getCurrentProfile();
              } else {
                this.setState({
                  error: {
                    msg: 'Some error occurred in the backend.',
                    type: 0,
                  },
                });
              }
            });
        }
      );
    }
  };
  render() {
    const { user } = this.props.auth;
    let currentPoints = 0;
    if (this.props.profile.profile) {
      currentPoints =
        this.props.profile.profile.pointsEarned -
        this.props.profile.profile.pointsSpent;
    }
    let skills_arr = this.state.filtered_skills;
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
              <CurrentBalanceCard profile={this.props.profile} />
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
                        onChange={(e) => this.onChange(e)}
                      />
                      <span className='max-chars'>* (Max 50 characters)</span>
                    </div>

                    <div className='add-task-input-details'>
                      <div className='form-group'>
                        <label htmlFor='addTaskDetails'>Requirements</label>
                        <DescriptionEditor
                          onAssignQuillObj={this.onAssignQuillObj}
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
                        onChange={(e) => this.onChange(e)}
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
                        onChange={(e) => this.onChange(e)}
                      >
                        <option defaultValue>Choose...</option>
                        {categories.map((cat, id) => {
                          return <option key={id}>{cat.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className='add-task-categories form-group'>
                      <label htmlFor='skills'>Select Skills</label>
                      <input
                        className='form-control'
                        placeholder='search skills'
                        value={this.state.search_skills_text}
                        onChange={this.onSearchSkillsSearch}
                      />
                      <select
                        multiple
                        className='form-control'
                        id='skills'
                        onChange={(e) => this.onChange(e)}
                        style={{ height: '136px' }}
                      >
                        {skills_arr.map((skill, id) => {
                          return <option key={id}>{skill.name}</option>;
                        })}
                      </select>
                      <span className='max-chars'>
                        * Choose upto 3 most related skills{' '}
                      </span>
                    </div>

                    <div className='add-task-input-points form-group'>
                      <label htmlFor='points'>Points Allocated</label>
                      <input
                        type='number'
                        id='points'
                        className='form-control mb-2'
                        aria-describedby='taskPointsHelp'
                        onChange={(e) => this.onChange(e)}
                        value={this.state.points_for_task}
                        disabled={!currentPoints}
                        onFocus={this.handleFocus}
                      />
                      <div className='points-change-btns'>
                        <button
                          onClick={this.onAddPoints}
                          className='btn btn-primary'
                        >
                          {' '}
                          <i
                            className='fa fa-plus little-text-shadow'
                            aria-hidden='true'
                          />
                        </button>
                        <button
                          onClick={this.onSubPoints}
                          className='btn btn-primary'
                        >
                          {' '}
                          <i
                            className='fa fa-minus little-text-shadow'
                            aria-hidden='true'
                          />
                        </button>
                      </div>

                      <small id='taskPointsHelp' className='text-muted'>
                        Must depict the requirements you mentioned
                      </small>
                    </div>

                    <div className='task-points-confirm form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='gridCheck1'
                        onChange={(e) => this.onChange(e)}
                      />
                      <label className='form-check-label' htmlFor='gridCheck1'>
                        I confirm that the information provided in this task
                        form is my responsibility and it does not violate any of
                        the <a href='#'>terms & conditions</a> of Taskbarter.
                      </label>
                    </div>

                    <div className='task-button-submit'>
                      <button
                        disabled={!currentPoints || this.state.sending_state}
                        type='submit'
                        className='btn add-task-btn'
                      >
                        {this.state.sending_state
                          ? 'Adding Task...'
                          : 'Add Task'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className='card card-body mb-2'>
                  <div className='text-center mg-32'>
                    <span className='tick-mark-completion'>
                      <i
                        className='fa fa-check little-text-shadow'
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
  addTask: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

AddTask.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'formula'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
AddTask.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'formula',
];

export default connect(mapStateToProps, { addTask, getCurrentProfile })(
  AddTask
);
