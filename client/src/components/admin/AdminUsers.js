import React, { Component } from 'react';
import AdminNav from './subs/AdminNav';
import { fetchUsers } from '../../actions/adminActions';
import { connect } from 'react-redux';
import moment from 'moment';

class AdminUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div>
        <AdminNav selected={1} />
        <div className='container explore-container' id='explore-container'>
          <div className='task-list-section'>
            <div className='task-list-title'>
              Last Updated Users{' '}
              <button
                onClick={this.props.fetchUsers}
                className='btn notification-btn fl-r'
              >
                Refresh Data
              </button>
            </div>

            <div>
              <ol>
                {this.props.users && !this.props.users.msg
                  ? this.props.users.map((user, id) => {
                      return (
                        <li key={id}>
                          <strong>
                            {user.user_details.length ? (
                              <span>
                                {user.user_details[0].first_name}{' '}
                                {user.user_details[0].second_name}
                              </span>
                            ) : (
                              'General'
                            )}
                          </strong>{' '}
                          ({user.name} | {user.email})
                          <div style={{ fontSize: 10 }} className='mt-2'>
                            Last Login:{' '}
                            {new Date(user.lastVisitedOn).toString()}
                          </div>
                          <div className='mb-4 mt-2 ql-editor dt-description'>
                            {user.user_details.length ? (
                              <div>
                                Earned: {user.user_details[0].pointsEarned}{' '}
                                <br />
                                Spent: {user.user_details[0].pointsSpent} <br />
                                Tasks Done: {
                                  user.user_details[0].tasksDone
                                }{' '}
                                <br />
                                Tasks Posted: {
                                  user.user_details[0].tasksPosted
                                }{' '}
                                <br />
                                Tasks Canceled:{' '}
                                {user.user_details[0].tasksCanceled} <br />
                                Proposals Sent: {user.proposal_sent}{' '}
                              </div>
                            ) : (
                              'General'
                            )}
                          </div>
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
  users: state.admin_data.users,
});

export default connect(mapStateToProps, {
  fetchUsers,
})(AdminUsers);
