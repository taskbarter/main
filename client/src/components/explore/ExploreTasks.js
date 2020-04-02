import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTasks } from '../../actions/taskAction';
import { getTasksCount } from '../../actions/taskAction';
import { dateEpx } from '../../actions/taskAction';
import { toggleLike, doExplore } from '../../actions/taskAction';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import FilterMenu from './filters/FilterMenu';
import { Input } from 'reactstrap';
import '../../style/task.css';
import FeedCard from './subs/FeedCard';
import TaskCard from './subs/TaskCard';

class ExploreTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      current_segment: 0,
      segment_size: 8,
      search_query: '',
      sort_by: -1,
      skills_filter: [],
      location_filter: [],
      industry_filter: [],
      first_time: true
    };
  }

  componentDidMount() {
    let filters = this.fetchFilters();
    this.updateFeed(filters, false);
    //console.log(filters);
    document.addEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('explore-container');
    if (this.isBottom(wrappedElement)) {
      console.log('explore bottom reached');
      document.removeEventListener('scroll', this.trackScrolling);
      this.updateFeed();
    }
  };

  isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  updateFeed = (shouldAppend = true) => {
    let filters = this.fetchFilters();
    this.props
      .doExplore(filters, shouldAppend)
      .then(() => {
        this.setState({
          current_segment: this.state.current_segment + 1
        });
      })
      .then(() => {
        document.addEventListener('scroll', this.trackScrolling);
      });
  };

  fetchFilters = () => {
    const explored_filters = {
      c: this.state.current_segment,
      z: this.state.segment_size,
      s: this.state.search_query,
      r: this.state.sort_by,
      k: this.state.skills_filter,
      l: this.state.location_filter,
      i: this.state.industry_filter
    };
    return explored_filters;
  };

  onSearch = e => {
    if (e.target.value === '') {
      this.setState(
        {
          current_segment: 0
        },
        () => {
          this.updateFeed(false);
        }
      );
    }
    this.setState({
      search_query: e.target.value
    });
  };

  onEnterPress = e => {
    if (e.key === 'Enter') {
      this.setState(
        {
          current_segment: 0
        },
        () => {
          this.updateFeed(false);
        }
      );
    }
  };

  render() {
    const allTasks = this.props.task.tasks;
    return (
      <div>
        <FilterMenu />

        <div className='container explore-container' id='explore-container'>
          <div className='search-container'>
            <Input
              type='search'
              name='search'
              id='exampleSearch'
              placeholder='search tasks'
              className='task-search-box'
              value={this.state.search_query}
              onChange={this.onSearch}
              onKeyPress={this.onEnterPress}
            />
          </div>

          <div className='task-list-section'>
            <div className='task-list-title'>Top new jobs on Taskbarter</div>
            <div className='task-list-container'>
              <FeedCard />
              {allTasks.map((task, i) => (
                <TaskCard task={task} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExploreTasks.propTypes = {
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllTasks: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
  getTasksCount: PropTypes.func.isRequired,
  doExplore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllTasks,
  toggleLike,
  getTasksCount,
  doExplore
})(ExploreTasks);
