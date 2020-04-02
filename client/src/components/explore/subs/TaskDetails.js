import React, { useState, useEffect, Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip
} from 'reactstrap';
import { fetchTask } from '../../../actions/taskAction';
import { connect } from 'react-redux';

const TaskDetails = props => {
  const { modal, toggle } = props;

  const [task, setTask] = useState({});

  useEffect(() => {
    console.log(task);
  }, [task]);
  const handleChange = newTask => {
    setTask(newTask);
  };
  const modalOpened = () => {
    props.fetchTask(props.selected_task).then(payload => {
      handleChange(payload.taskData[0]);
    });
  };

  const modalClosed = () => {
    setTask({});
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onOpened={modalOpened}
      onClosed={modalClosed}
    >
      <ModalHeader toggle={toggle}>{task.headline}</ModalHeader>
      <ModalBody>{task.description}</ModalBody>
    </Modal>
  );
};

export default connect(null, {
  fetchTask
})(TaskDetails);
