import React, { useState, useEffect, Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Spinner,
} from 'reactstrap';
import bookmark_icon from '../../../style/inc/bookmark.svg';
import share_icon from '../../../style/inc/share.svg';
import { fetchTask } from '../../../actions/taskAction';
import { connect } from 'react-redux';
import moment from 'moment';
import TLoader from '../../utils/TLoader';

const TaskDetails = (props) => {
  const { modal, toggle } = props;

  const [task, setTask] = useState({});

  useEffect(() => {
    console.log(task);
  }, [task]);
  const handleChange = (newTask) => {
    setTask(newTask);
  };
  const modalOpened = () => {
    props.fetchTask(props.selected_task).then((payload) => {
      handleChange(payload.taskData[0]);
    });
  };

  const skillsbadges2 = (skills) => {
    if (skills) {
      let fsix = skills;

      return fsix.map((skl, i) => (
        <div className='profile-skills dt-skills' key={i}>
          {skl}
        </div>
      ));
    }
  };

  const skillSection = (
    <div className='profile-badge-categories'>{skillsbadges2(task.skills)}</div>
  );

  const modalClosed = () => {
    setTask({});
  };

  if (!task.headline) {
    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        onOpened={modalOpened}
        onClosed={modalClosed}
        className='dt-modal dt-loading fade-scale'
      >
        <ModalBody className='dt-body loading'>
          <TLoader colored={true} />
        </ModalBody>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onOpened={modalOpened}
      onClosed={modalClosed}
      className='dt-modal fade-scale'
    >
      <ModalHeader toggle={toggle} className='dt-header'>
        <div className='dt-sub-title'>I want someone to</div>
        <div className='dt-title'>{task.headline}</div>
        <div className='dt-added-on'>
          Posted <span className='dt-date'>{moment(task.date).fromNow()}</span>{' '}
          • 0 applicants
        </div>
      </ModalHeader>
      <div className='dt-action-box'>
        <div className='feed-card--footer'>
          <div className='feed-card--footer-left '>
            {' '}
            <img
              src={bookmark_icon}
              className='svg_icon icon_inactive'
              id='SaveJob'
            ></img>
            &nbsp;&nbsp;&nbsp;
            <img
              src={share_icon}
              className='svg_icon icon_inactive'
              id='share-job'
            ></img>
          </div>
          <div className='feed-card--footer-right '>
            <button
              onClick={props.proposal_toggle}
              className='feed-card-learn-more dt-action-btn'
            >
              Send Proposal
            </button>
          </div>
        </div>
      </div>
      <ModalBody className='dt-body'>
        <div className='task-list-title dt-title'>Reward</div>
        <div className='mb-2'>
          You will earn{' '}
          <span className='dt-points'>{task.taskpoints} points</span>
        </div>
        <div className='task-list-title dt-title'>Category</div>
        <div className='mb-2'>{task.category}</div>
        <div className='task-list-title dt-title mb-1'>Skills</div>
        <div className='mb-2 mt-1'>{skillSection}</div>
        <div className='task-list-title dt-title'>Description</div>
        <div className='mb-2 mt-1 ql-editor dt-description'>
          <div
            dangerouslySetInnerHTML={{
              __html: task.description,
            }}
          ></div>
        </div>
        <div className='task-list-title dt-title'>Posted By</div>
        {task.userdetails && task.userdetails[0] ? (
          <div className='mb-2'>
            <span className='dt-points'>
              {task.userdetails[0].first_name} {task.userdetails[0].second_name}
            </span>
            <div className='dt-added-on'>
              Member since{' '}
              <span className='dt-date'>
                {moment(task.userdetails[0].memberSince).years()}
              </span>{' '}
              • {task.userdetails[0].location}
            </div>
          </div>
        ) : (
          <div className='mb-2'>Hidden</div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default connect(null, {
  fetchTask,
})(TaskDetails);
