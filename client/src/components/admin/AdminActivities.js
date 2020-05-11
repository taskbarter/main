import React, { Component } from 'react';
import AdminNav from './subs/AdminNav';
import { fetchActivities } from '../../actions/adminActions';
import { connect } from 'react-redux';
import moment from 'moment';

class AdminActivities extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchActivities();
  }
  render() {
    return (
      <div>
        <AdminNav selected={2} />
        <div className='container explore-container' id='explore-container'>
          <div className='task-list-section'>
            <div className='task-list-title'>
              100 Last Updated Activities{' '}
              <button
                onClick={this.props.fetchActivities}
                className='btn notification-btn fl-r'
              >
                Refresh Data
              </button>
            </div>

            <div>
              <ol>
                {this.props.activities && !this.props.activities.msg
                  ? this.props.activities.map((activity, id) => {
                      return (
                        <li key={id}>
                          (From{' '}
                          <strong>
                            {activity.user_details.length ? (
                              <span>
                                {activity.user_details[0].first_name}{' '}
                                {activity.user_details[0].second_name}
                              </span>
                            ) : (
                              'General'
                            )}
                          </strong>
                          ) {activity.activity}
                          <div style={{ fontSize: 10 }} className='mt-2'>
                            {new Date(activity.createdAt).toString()}
                          </div>
                          <div className='mb-4 mt-2 ql-editor dt-description'>
                            {activity.payload}
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
  activities: state.admin_data.activities,
});

export default connect(mapStateToProps, {
  fetchActivities,
})(AdminActivities);
