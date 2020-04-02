import React, { useState, useEffect, Component } from 'react';
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

  const [task, setTask] = useState({
    headline: '',
    skills: [],
    description: '',
    taskpoints: 0,
    category: '',
    user: {},
    date: new Date()
  });

  const modalOpened = () => {
    console.log('OOO');
  };

  return (
    <Modal isOpen={modal} toggle={toggle} onOpened={modalOpened}>
      <ModalHeader toggle={toggle}>How Taskbarter Works?</ModalHeader>
      <ModalBody>ID: {props.selected_task}</ModalBody>
    </Modal>
  );
};

export default TaskDetails;
