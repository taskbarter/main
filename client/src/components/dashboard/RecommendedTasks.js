import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTasks } from '../../actions/taskAction';

const RecommendedTasks = props => {
  if (props.task.tasks.length < 1 && !props.task.loading) {
    props.getAllTasks();
  }
  const allTasks = props.task.tasks;
  console.log(allTasks);

  const heartClick = e => {
    if (document.getElementById(e.target.id).classList.contains('far')) {
      document.getElementById(e.target.id).classList.remove('far');
      document.getElementById(e.target.id).classList.add('fas');
    } else {
      document.getElementById(e.target.id).classList.remove('fas');
      document.getElementById(e.target.id).classList.add('far');
    }
  };

  const alltasksDOM = allTasks.map((tsk, i) => (
    <div className='task-entry mb-1' key={tsk._id}>
      <div className='task-entry-body'>
        <div id='task-statement'>{tsk.headline}</div>
        <div id='task-details'>
          {tsk.description}(<a href='#'>more</a>)
        </div>
        <a href='#' className='task-more-options'>
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
          <div className='col-sm-4 task-date'>added 3 hours ago</div>
        </div>
      </div>
      <div className='task-footer'>
        <span className='task-fav'>
          <i
            onClick={heartClick}
            id={tsk._id + 1}
            className='far fa-heart fa-fw'
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

  return (
    <div className='card card-body'>
      <div className='tasks-heading'>Recommended Tasks</div>

      <div className='tasks-entries pt-2'>{alltasksDOM}</div>
    </div>
  );
};

RecommendedTasks.propTypes = {
  task: PropTypes.object.isRequired,
  getAllTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task
});

export default connect(
  mapStateToProps,
  { getAllTasks }
)(RecommendedTasks);
