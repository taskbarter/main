import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTasks } from '../../actions/taskAction';
import { dateEpx } from '../../actions/taskAction';
import { toggleLike } from '../../actions/taskAction';

const RecommendedTasks = props => {
  useEffect(() => {
    props.getAllTasks(3);
  }, []);
  // if (props.task.tasks.length < 1 && !props.task.loading) {
  //   props.getAllTasks(3);
  // }
  const allTasks = props.task.tasks;
  //testing comment
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

  const alltasksDOM = [];
  //allTasks.map((tsk, i) => (
  //   <div className='task-entry mb-1' key={tsk._id}>
  //     <div className='task-entry-body'>
  //       <div id='task-statement'>{tsk.headline}</div>
  //       <div id='task-details'>
  //         {tsk.description} (<a href='#!'>more</a>)
  //       </div>
  //       <a href='#!' className='task-more-options'>
  //         <i className='fa fa-ellipsis-v' aria-hidden='true' />
  //       </a>
  //       <div className='row mt-2'>
  //         <div className='col-sm-8'>
  //           {tsk.skills.map((skl, index) => (
  //             <div className='task-category' key={tsk._id + index}>
  //               {skl}
  //             </div>
  //           ))}
  //         </div>
  //         <div id={tsk._id + 'date'} className='col-sm-4 task-date'>
  //           <div>{dateEpx(tsk.date)}</div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className='task-footer'>
  //       <span className='task-fav'>
  //         <i
  //           onClick={e => heartClick(e, tsk._id)}
  //           id={tsk._id + 'heart'}
  //           className={preHeartFun(tsk.likes) + ' fa-heart fa-fw'}
  //         />
  //       </span>
  //       <button className='btn task-hire-btn'>Send Proposal</button>
  //       <div className='task-points'>
  //         {tsk.taskpoints} <span className='task-points-curr'>TP</span>
  //       </div>
  //       <div className='task-rating'>
  //         <i className='fas fa-star fa-fw' />
  //         <i className='fas fa-star fa-fw' />
  //         <i className='fas fa-star fa-fw' />
  //         <i className='fas fa-star-half-alt' />
  //         <i className='far fa-star fa-fw' />
  //         <span className='rating-info'>(25 reviews)</span>
  //       </div>
  //     </div>
  //   </div>
  // ));

  return (
    <div className='card card-body'>
      <div className='tasks-heading'>Recently Added Tasks</div>

      <div className='tasks-entries pt-2'>{alltasksDOM}</div>
      <Link to='/explore'>
        <button className='mt-3 btn redeem-btn'>View More Tasks...</button>
      </Link>
    </div>
  );
};

RecommendedTasks.propTypes = {
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllTasks: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllTasks, toggleLike })(
  RecommendedTasks
);
