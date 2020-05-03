import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const EditTaskAction = (props) => {
  return (
    <React.Fragment>
      <div className='card card-body redeem-points mb-2'>
        <div className='redeem-heading'>Change Status</div>
        <div className='redeem-text'>
          You can change status of this task and control its visibility. It is
          currently set to{' '}
          <strong>
            {props.status === 0 || props.status === undefined
              ? 'Available for proposals'
              : props.status === 2
              ? 'Paused'
              : 'Archived'}
            .
          </strong>
        </div>

        {props.status === 0 || props.status === undefined ? (
          <div className='act-rej'>
            <button
              onClick={() => {
                props.onStatusChange(2);
              }}
              disabled={props.submitting_state}
              className='col-6 btn redeem-btn pause-btn'
            >
              <i class='fa fa-eye-slash' aria-hidden='true'></i> &nbsp; Pause
            </button>
            <button
              onClick={() => {
                props.onStatusChange(3);
              }}
              disabled={props.submitting_state}
              className='col-6 btn redeem-btn reject-btn'
            >
              <i className='fa fa-times' aria-hidden='true'></i> &nbsp; Remove
            </button>
          </div>
        ) : props.status === 2 ? (
          <div className='act-rej'>
            <button
              onClick={() => {
                props.onStatusChange(0);
              }}
              disabled={props.submitting_state}
              className='col-6 btn redeem-btn accept-btn'
            >
              <i class='fa fa-eye' aria-hidden='true'></i> &nbsp; Unpause
            </button>
            <button
              onClick={() => {
                props.onStatusChange(3);
              }}
              disabled={props.submitting_state}
              className='col-6 btn redeem-btn reject-btn'
            >
              <i className='fa fa-times' aria-hidden='true'></i> &nbsp; Remove
            </button>
          </div>
        ) : (
          <div className='act-rej'>
            The task is now deleted and your points are refunded.
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditTaskAction;
