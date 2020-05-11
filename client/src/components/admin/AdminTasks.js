import React, { Component } from 'react';
import AdminNav from './subs/AdminNav';
import { fetchTasks } from '../../actions/adminActions';
import { connect } from 'react-redux';
import moment from 'moment';
import TaskState from '../task/subs/TaskState';

class AdminTasks extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }
  render() {
    return (
      <div>
        <AdminNav selected={3} />
        <div className='container explore-container' id='explore-container'>
          <div className='task-list-section'>
            <div className='task-list-title'>
              Last Updated Tasks{' '}
              <button
                onClick={this.props.fetchTasks}
                className='btn notification-btn fl-r'
              >
                Refresh Data
              </button>
            </div>
            <div>
              <hr />
              <ol>
                {this.props.tasks && !this.props.tasks.msg
                  ? this.props.tasks.map((task, id) => {
                      return (
                        <li key={id}>
                          <strong>{task.headline}</strong>
                          <TaskState state={task.state} />
                          <div style={{ fontSize: 10 }}>
                            (From{' '}
                            {task.user_details.length ? (
                              <span>
                                {task.user_details[0].first_name}{' '}
                                {task.user_details[0].second_name}
                              </span>
                            ) : (
                              'General'
                            )}
                            )
                          </div>{' '}
                          <div style={{ fontSize: 10 }} className='mt-2'>
                            Last Updated: {new Date(task.updatedAt).toString()}
                            <br />
                            Created: {new Date(task.createdAt).toString()}
                          </div>
                          <div className='mb-4 mt-2 ql-editor dt-description'>
                            <div>
                              Task Points: {task.taskpoints} <br />
                              Proposals Received: {task.proposals_received}{' '}
                            </div>
                            <div className='mb-4 mt-2 ql-editor dt-description'>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: task.description,
                                }}
                              ></div>
                            </div>
                          </div>
                          <hr />
                        </li>
                      );
                    })
                  : 'you are not an admin'}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.admin_data.tasks,
});

export default connect(mapStateToProps, {
  fetchTasks,
})(AdminTasks);
