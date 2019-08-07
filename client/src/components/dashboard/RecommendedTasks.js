import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTasks } from '../../actions/taskAction';

const RecommendedTasks = props => {
  if (props.task.tasks.length < 1 && !props.task.loading) {
    props.getAllTasks();
    console.log('in here');
  }
  console.log(props.task.loading);

  return (
    <div className='card card-body'>
      <div className='tasks-heading'>Recommended Tasks</div>

      <div className='tasks-entries pt-2'>
        <div className='task-entry mb-1'>
          <div className='task-entry-body'>
            <div id='task-statement'>
              Design a new logo for our company that has funky and artistic
              effects in in it. We need it urgently.
            </div>
            <div id='task-details'>
              I want someone to actually review all the reports that have been
              written before and create something meaningful for our company
              that has some value... (<a href='#'>more</a>)
            </div>
            <a href='#' className='task-more-options'>
              <i className='fa fa-ellipsis-v' aria-hidden='true' />
            </a>
            <div className='row mt-2'>
              <div className='col-sm-8'>
                <div className='task-category'>Chemical</div>
                <div className='task-category'>Engineering</div>
              </div>
              <div className='col-sm-4 task-date'>added 3 hours ago</div>
            </div>
          </div>
          <div className='task-footer'>
            <span className='task-fav'>
              <i className='far fa-heart fa-fw' />
            </span>
            <button className='btn task-hire-btn'>Send Proposal</button>
            <div className='task-points'>
              14 <span className='task-points-curr'>TP</span>
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

        <div className='task-entry mb-1'>
          <div className='task-entry-body'>
            <div id='task-statement'>
              Develop an optimized database using 3NF database rule and make it
              as modular as possible.
            </div>
            <div id='task-details'>
              I am a computer student and I recently got an assignment saying
              that I have to create something extraordinary and exceptional like
              this database... (<a href='#'>more</a>)
            </div>
            <a href='#' className='task-more-options'>
              <i className='fa fa-ellipsis-v' aria-hidden='true' />
            </a>
            <div className='row mt-2'>
              <div className='col-sm-8'>
                <div className='task-category'>Programming</div>
                <div className='task-category'>Database</div>
                <div className='task-category'>SQL</div>
              </div>
              <div className='col-sm-4 task-date'>added 1 day ago</div>
            </div>
          </div>
          <div className='task-footer'>
            <span className='task-fav'>
              <i className='far fa-heart fa-fw' />
            </span>
            <button className='btn task-hire-btn'>Send Proposal</button>
            <div className='task-points'>
              21 <span className='task-points-curr'>TP</span>
            </div>
            <div className='task-rating'>
              <i className='fas fa-star fa-fw' />
              <i className='fas fa-star fa-fw' />
              <i className='fas fa-star fa-fw' />
              <i className='far fa-star fa-fw' />
              <i className='far fa-star fa-fw' />
              <span className='rating-info'>(1 review)</span>
            </div>
          </div>
        </div>

        <div className='task-entry mb-1'>
          <div className='task-entry-body'>
            <div id='task-statement'>
              Write an exceptional report with the feasibility study of using AI
              for human computer interaction.
            </div>
            <div id='task-details'>
              I have a rude teacher who has said that the world is temporary but
              the assignment marks are permanent so please can anyone... (
              <a href='#'>more</a>)
            </div>
            <a href='#' className='task-more-options'>
              <i className='fa fa-ellipsis-v' aria-hidden='true' />
            </a>
            <div className='row mt-2'>
              <div className='col-sm-8'>
                <div className='task-category'>Artificial Intelligence</div>
              </div>
              <div className='col-sm-4 task-date'>added a month ago</div>
            </div>
          </div>
          <div className='task-footer'>
            <span className='task-fav'>
              <i className='far fa-heart fa-fw' />
            </span>
            <button className='btn task-hire-btn'>Send Proposal</button>
            <div className='task-points'>
              9 <span className='task-points-curr'>TP</span>
            </div>
            <div className='task-rating'>
              <i className='fas fa-star fa-fw' />
              <i className='fas fa-star fa-fw' />
              <i className='fas fa-star fa-fw' />
              <i className='fas fa-star' />
              <i className='fas fa-star-half-alt fa-fw' />
              <span className='rating-info'>(180 reviews)</span>
            </div>
          </div>
        </div>
      </div>
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
