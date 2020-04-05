import React, { useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetch_workplace_tasks } from '../../actions/taskAction';
import { dateEpx } from '../../actions/taskAction';
import { toggleLike } from '../../actions/taskAction';
import TaskCard from '../explore/subs/TaskCard';
import TaskDetails from '../explore/subs/TaskDetails';

class RecommendedTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail_popup_is_open: false,
      selected_task: 0,
      workplaceTasks: []
    };
  }

  fetchFilters = () => {
    const explored_filters = {
      c: 0,
      z: 2,
      s: '',
      r: '',
      k: '',
      l: '',
      i: ''
    };
    return explored_filters;
  };

  componentDidMount() {
    this.props
      .fetch_workplace_tasks()
      .then(() => {
        console.log(this.props.tasks);
        this.setState({
          workplaceTasks: this.props.tasks
        });
      })
      .then(() => {
        //this.props.doExplore({}, false);
      });
  }
  onTaskSelect = task_id => {
    this.setState({ selected_task: task_id }, () => {
      this.task_detail_toggle();
    });
  };

  task_detail_toggle = () => {
    this.setState({
      detail_popup_is_open: !this.state.detail_popup_is_open
    });
  };
  render() {
    return (
      <div className='card card-body'>
        <div className='tasks-heading'>Recently Added Tasks</div>
        <br />
        <div className='task-list-container task-list-dashboard'>
          {this.state.workplaceTasks.map((task, i) => (
            <TaskCard task={task} key={i} onClick={this.onTaskSelect} />
          ))}
        </div>
        <Link to='/explore'>
          <button className='mt-3 btn redeem-btn'>Explore More Work</button>
        </Link>

        <TaskDetails
          toggle={this.task_detail_toggle}
          modal={this.state.detail_popup_is_open}
          selected_task={this.state.selected_task}
        />
      </div>
    );
  }
}

RecommendedTasks.propTypes = {
  auth: PropTypes.object.isRequired,
  fetch_workplace_tasks: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tasks: state.task.workplace_tasks,
  auth: state.auth
});

export default connect(mapStateToProps, { fetch_workplace_tasks, toggleLike })(
  RecommendedTasks
);
