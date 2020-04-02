import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap';

const TaskDetails = props => {
  const { modal, toggle } = props;

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>How Taskbarter Works?</ModalHeader>
      <ModalBody>ID: {props.selected_task}</ModalBody>
    </Modal>
  );
};

export default TaskDetails;
