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

const ProposalForm = (props) => {
  const { modal, toggle } = props;

  const [task, setTask] = useState({});

  useEffect(() => {}, [task]);
  const handleChange = (newTask) => {
    setTask(newTask);
  };
  const modalOpened = () => {
    props.fetchTask(props.selected_task).then((payload) => {
      handleChange(payload.taskData[0]);
    });
  };
  const modalClosed = () => {
    props.changeProposalText(false);
    setTask({});
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onOpened={modalOpened}
      onClosed={modalClosed}
      className='dt-modal pro-modal fade-scale'
    >
      <ModalHeader toggle={toggle} className='dt-header'>
        <div className='task-list-title dt-title pt-1'>
          Message to the task poster
        </div>
      </ModalHeader>
      <ModalBody
        className='dt-body'
        style={{ overflow: 'hidden', minHeight: 'none' }}
      >
        <textarea
          placeholder='enter message...'
          rows='6'
          className='form-control pro-textarea'
          value={props.proposal_text}
          onChange={props.changeProposalText}
        />
      </ModalBody>
      <ModalFooter>
        <button
          disabled={props.proposal_text.length < 4 || props.proposalLoading}
          className='btn btn-primary'
          onClick={props.sendProposal}
        >
          {props.proposalLoading ? 'Sending...' : 'Send Proposal'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default connect(null, {
  fetchTask,
})(ProposalForm);
