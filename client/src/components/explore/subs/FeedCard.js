import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Link } from 'react-router-dom';

const FeedCard = props => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <React.Fragment>
      <div className='feed-card how-it-works-card'>
        <div className='feed-card--how-it-works-header'>
          How bartering works?
        </div>
        <div className='feed-card--how-it-works-body'>
          You do some tasks for others and others help you with your task. This
          is completely free on Taskbarter.
        </div>
        <div className='find-out-button-container'>
          <button onClick={toggle} className='find-out-button'>
            Find out how
          </button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>How Taskbarter Works?</ModalHeader>
        <ModalBody>
          Taskbarter helps you achieve what you want to.
          <br />
          <ol>
            <li>Find some tasks that you are most expert in.</li>
            <li>
              Negotiate with the Task publisher on how many points you want to
              earn.
            </li>
            <li>Complete the task in decided time.</li>
            <li>You'll earn points on completing every task.</li>
          </ol>
          Once you've completed some tasks, you can hire people in the same way.
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Got it
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default FeedCard;
