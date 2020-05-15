import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import CurrentBalanceCard from '../profile/CurrentBalanceCard';
import AddTaskHints from './AddTaskHints';
import Footer from '../layout/Footer';
import {
  addTask,
  fetchTaskForEdit,
  editTaskStatus,
  editTaskContent,
} from '../../actions/taskAction';
import { getCurrentProfile } from '../../actions/profileAction';
import validate from '../../config/rules';
import categories from '../../config/categories';
import skills from '../../config/skills';
import AlertMsg from '../utils/AlertMsg';
import { useQuill } from 'react-quilljs';
import DescriptionEditor from './subs/DescriptionEditor';
import filter from 'lodash/filter';
import find from 'lodash/find';
import TLoader from '../utils/TLoader';
import EditTaskAction from './subs/EditTaskAction';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

class EditTask extends Component {
  constructor() {
    super();
    this.state = {
      selected_task: '',
      task: {},
      loading: true,
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
      selected_skills: [],
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState(
      {
        selected_task: id,
        filtered_skills: skills,
      },
      () => {
        this.refreshData();
      }
    );
  }

  refreshData = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props
          .fetchTaskForEdit(this.state.selected_task)
          .then((fetched_task) => {
            const valid_data =
              fetched_task &&
              fetched_task.taskData[0] &&
              fetched_task.taskData[0].headline
                ? fetched_task
                : null;
            if (valid_data === null) {
              return this.setState({
                task: valid_data,
                loading: false,
              });
            }

            const task_data =
              fetched_task &&
              fetched_task.taskData[0] &&
              fetched_task.taskData[0].headline
                ? fetched_task.taskData[0]
                : null;
            this.setState(
              {
                task: valid_data,
                loading: false,
                headline: task_data.headline,
                points: task_data.taskpoints,
                requirement: task_data.description,
                duration: task_data.duration,
                category: task_data.category,
                points_for_task: task_data.taskpoints,
                skills: task_data.skills,
                task_status: task_data.state,
              },
              () => {
                const selected_skills_temp = this.getSelectedSkillsIds();
                this.setState({
                  selected_skills: selected_skills_temp,
                });
              }
            );
          });
      }
    );
  };

  onAssignQuillObj = (quillObj) => {
    this.setState(
      {
        quillObj: quillObj,
      },
      () => {
        this.state.quillObj.root.innerHTML = this.state.requirement;
      }
    );
  };

  onSelectSkill = (e) => {
    if (this.state.selected_skills.length > 2) {
      this.setState({
        search_skills_text: '',
      });
    }

    if (!this.state.selected_skills.includes(parseInt(e.target.id))) {
      this.state.selected_skills.push(parseInt(e.target.id));
      this.setState({
        selected_skills: this.state.selected_skills,
      });
    } else {
      this.state.selected_skills.splice(
        this.state.selected_skills.indexOf(parseInt(e.target.id)),
        1
      );
      this.setState({
        selected_skills: this.state.selected_skills,
      });
    }
  };

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

  getSelectedSkillsIds = () => {
    let arr = [];
    for (let i in this.state.skills) {
      let temp1 = find(skills, { name: this.state.skills[i] });
      if (temp1) arr.push(temp1.id);
    }
    return arr;
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value }); // same is req to work
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

  onStatusChange = (new_status) => {
    const payload = {
      new_status: new_status,
      task_id: this.state.selected_task,
    };
    this.props.editTaskStatus(payload).then(() => {
      this.refreshData();
      this.props.getCurrentProfile();
    });
  };

  getSelectedSkills = () => {
    let arr = [];
    for (let i in this.state.selected_skills) {
      let temp1 = find(skills, { id: this.state.selected_skills[i] });
      arr.push(temp1.name);
    }
    return arr;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { headline, areTermsAccepted, category, duration } = this.state;

    const description = this.state.quillObj.getText();

    let err = '';
    err =
      validate('headline', headline) || validate('description', description);

    if (err !== '') {
      this.setState({
        error: { msg: err, type: 0 },
      });
    }

    if (this.state.selected_skills.length > 3) {
      err = 'You can only select 3 skills at max.';
      this.setState({
        error: { msg: err, type: 0 },
      });
    }

    if (this.state.selected_skills.length === 0) {
      err = 'You must select at least one skill to continue.';
      this.setState({
        error: { msg: err, type: 0 },
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
      const taskChanges = {
        description: this.state.quillObj.root.innerHTML,
        duration: this.state.duration,
        category: this.state.category,
        skills: this.getSelectedSkills(),
        task_id: this.state.selected_task,
      };
      this.setState(
        {
          sending_state: true,
        },
        () => {
          this.props
            .editTaskContent(taskChanges, this.props.history)
            .then((isSuccessful) => {
              if (isSuccessful) {
                window.scrollTo(0, 0);
                this.setState({
                  isAccepted: true,
                  error: {
                    msg: 'Your task has been successfully updated.',
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
    if (this.state.loading) {
      return (
        <div className='taskv-loader'>
          <TLoader colored={true} />
        </div>
      );
    }

    if (!this.state.task) {
      return (
        <div className='taskv-loader error-msg-center'>
          You are not allowed to view this page.
          <Link className='clear-a mt-4' to='/'>
            <button className='btn btn-primary btn-sm'>Go back</button>
          </Link>
        </div>
      );
    }

    const task = this.state.task.taskData[0];
    let skills_arr = this.state.filtered_skills;
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
              {!this.state.isAccepted ? (
                <React.Fragment>
                  {' '}
                  <EditTaskAction
                    status={task.state}
                    onStatusChange={this.onStatusChange}
                  />
                  <AddTaskHints status={task.state} />
                </React.Fragment>
              ) : (
                <div className='card card-body redeem-points mb-2'>
                  <div className='task-card-text'>
                    <Link to='/explore'>Explore Tasks</Link>
                  </div>
                </div>
              )}
            </div>

            <div className='col-md-8 order-md-1'>
              {!this.state.isAccepted ? (
                <div className='card card-body mb-2'>
                  <div className='add-task-heading'>Edit Task</div>

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
                        disabled='true'
                      />
                      <span className='max-chars'>
                        (You cannot change headline)
                      </span>
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
                        <option
                          selected={this.state.duration === 0.3}
                          value='.3'
                        >
                          one to ten hours
                        </option>
                        <option selected={this.state.duration === 1} value='1'>
                          less than 24 hours
                        </option>
                        <option selected={this.state.duration === 7} value='7'>
                          less than a week
                        </option>
                        <option
                          selected={this.state.duration === 30}
                          value='30'
                        >
                          less than a month
                        </option>
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
                          return (
                            <option
                              selected={this.state.category === cat.name}
                              key={id}
                            >
                              {cat.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className='add-task-categories form-group filter-dropdown-container mb-8'>
                      <label htmlFor='skills'>Select Skills</label>
                      <input
                        className='form-control add-task-skill-search'
                        placeholder='search skills'
                        value={this.state.search_skills_text}
                        onChange={this.onSearchSkillsSearch}
                      />
                      <div className='filter-dropdown__options filter-list add-task-skill'>
                        {skills_arr.map((skill, id) => {
                          return (
                            <label
                              className='checkbox__label'
                              key={id}
                              style={
                                !this.state.selected_skills.includes(
                                  skill.id
                                ) && this.state.selected_skills.length > 2
                                  ? { opacity: '0.5' }
                                  : {}
                              }
                            >
                              {skill.name}
                              <input
                                data-v-68624b48=''
                                type='checkbox'
                                name='filter-dropdown-experience'
                                value={skill.name}
                                id={skill.id}
                                onClick={this.onSelectSkill}
                                checked={this.state.selected_skills.includes(
                                  skill.id
                                )}
                                disabled={
                                  !this.state.selected_skills.includes(
                                    skill.id
                                  ) && this.state.selected_skills.length > 2
                                }
                              />{' '}
                              <span className='checkmark'></span>
                            </label>
                          );
                        })}
                      </div>
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
                        onFocus={this.handleFocus}
                        disabled='true'
                      />
                      <div className='points-change-btns'>
                        <button
                          onClick={this.onAddPoints}
                          className='btn btn-primary'
                          disabled='true'
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
                          disabled='true'
                        >
                          {' '}
                          <i
                            className='fa fa-minus little-text-shadow'
                            aria-hidden='true'
                          />
                        </button>
                      </div>

                      <small id='taskPointsHelp' className='text-muted'>
                        You cannot change task points after going live
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
                        disabled={this.state.sending_state}
                        type='submit'
                        className='btn add-task-btn'
                      >
                        {this.state.sending_state
                          ? 'Updating Task...'
                          : 'Update Task'}
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
                    Your task has been updated!{' '}
                    <Link to={`/t/${this.state.selected_task}`}>View</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
        <MetaTags>
          <title>Edit Task | Taskbarter</title>
        </MetaTags>
      </div>
    );
  }
}

EditTask.propTypes = {
  auth: PropTypes.object.isRequired,
  addTask: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

EditTask.modules = {
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
EditTask.formats = [
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

export default connect(mapStateToProps, {
  addTask,
  fetchTaskForEdit,
  getCurrentProfile,
  editTaskStatus,
  editTaskContent,
})(EditTask);
