import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import TaskShareIcons from '../../utils/TaskShareIcons';

const ShareTasksPopup = (props) => {
  const { modal, toggle } = props;

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className='dt-modal pro-modal fade-scale'
    >
      <ModalHeader toggle={toggle} className='dt-header'>
        <div className='dt-title'>Share Task</div>
      </ModalHeader>
      <ModalBody className='dt-body text-center share-popup-body '>
        <TaskShareIcons
          task_url={props.task.task_url}
          task_headline={props.task.task_headline}
          from={props.task.from}
          task_category={props.task.task_category}
        />
      </ModalBody>
    </Modal>
  );
};

export default connect(null, {})(ShareTasksPopup);
