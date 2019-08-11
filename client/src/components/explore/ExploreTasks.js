import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTasks } from '../../actions/taskAction';
import { getTasksCount } from '../../actions/taskAction';
import { dateEpx } from '../../actions/taskAction';
import { toggleLike } from '../../actions/taskAction';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const ExploreTasks = props => {
  // replacement of component did mount hook
  useEffect(() => {
    props.getAllTasks(10, 10);
    props.getTasksCount();
  }, []);

  //   if (props.task.tasks.length < 1 && !props.task.loading) {
  //     props.getAllTasks(0);
  //   }
  const allTasks = props.task.tasks;

  const heartClick = (e, id) => {
    if (document.getElementById(e.target.id).classList.contains('far')) {
      document.getElementById(e.target.id).classList.remove('far');
      document.getElementById(e.target.id).classList.add('fas');
    } else {
      document.getElementById(e.target.id).classList.remove('fas');
      document.getElementById(e.target.id).classList.add('far');
    }
    props.toggleLike(id);
  };

  const preHeartFun = likes => {
    const { auth } = props;
    var i;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      i = 'fas';
    } else {
      i = 'far';
    }
    return i;
  };

  const alltasksDOM = allTasks.map((tsk, i) => (
    <div className='task-entry mb-1' key={tsk._id}>
      <div className='task-entry-body'>
        <div id='task-statement'>{tsk.headline}</div>
        <div id='task-details'>
          {tsk.description} (<a href='#!'>more</a>)
        </div>
        <a href='#!' className='task-more-options'>
          <i className='fa fa-ellipsis-v' aria-hidden='true' />
        </a>
        <div className='row mt-2'>
          <div className='col-sm-8'>
            {tsk.skills.map((skl, index) => (
              <div className='task-category' key={tsk._id + index}>
                {skl}
              </div>
            ))}
          </div>
          <div id={tsk._id + 'dateexplore'} className='col-sm-4 task-date'>
            <div>{dateEpx(tsk.date)}</div>
          </div>
        </div>
      </div>
      <div className='task-footer'>
        <span className='task-fav'>
          <i
            onClick={e => heartClick(e, tsk._id)}
            id={tsk._id + 'heart'}
            className={preHeartFun(tsk.likes) + ' fa-heart fa-fw'}
          />
        </span>
        <button className='btn task-hire-btn'>Send Proposal</button>
        <div className='task-points'>
          {tsk.taskpoints} <span className='task-points-curr'>TP</span>
        </div>
        <div className='task-rating'>
          <i className='fas fa-star fa-fw' />
          <i className='fas fa-star fa-fw' />
          <i className='fas fa-star fa-fw' />
          <i className='fas fa-star-half-alt' />
          <i className='far fa-star fa-fw' />
          <span className='rating-info'>(25 reviews)</span>
        </div>
      </div>
    </div>
  ));

  const pageButtons = tButtons => {
    var btns = [];
    btns.push(
      <button key='pageinationbtn0' className='btn m-1'>
        &lt;
      </button>
    );
    var i;
    for (i = 1; i <= tButtons; i++) {
      btns.push(
        <button key={'pageinationbtn' + i} className='btn m-1'>
          {i}
        </button>
      );
    }
    btns.push(
      <button key={'pageinationbtn' + i} className='btn m-1'>
        &gt;
      </button>
    );
    return btns;
  };

  const paginations = tasksPerPage => {
    const totalButtons = Math.ceil(props.task.tasksCount / tasksPerPage);
    console.log(totalButtons);
    if (totalButtons === 0) return;

    const btns = pageButtons(totalButtons);

    return (
      <div className='text-center'>
        <div className='btn-group'>{btns}</div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className='card card-body'>
        <div className='tasks-heading'>All Tasks</div>

        <div className='tasks-entries pt-2'>{alltasksDOM}</div>
        {paginations(10)}
      </div>
    </div>
  );
};

ExploreTasks.propTypes = {
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllTasks: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
  getTasksCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllTasks, toggleLike, getTasksCount }
)(ExploreTasks);
