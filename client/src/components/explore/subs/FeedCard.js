import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Link } from 'react-router-dom';
import Barter from '../../dashboard/Barter';

const FeedCard = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <React.Fragment>
      <div className='feed-card how-it-works-card'>
        <div className='feed-card--how-it-works-header'>
          How bartering works?
        </div>
        <div className='feed-card--how-it-works-body'>
          You do some tasks for others and others help you with your tasks. This
          is completely free on Taskbarter.
        </div>
        <div className='find-out-button-container'>
          <button onClick={toggle} className='find-out-button'>
            Find out how
          </button>
        </div>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className='dt-modal fade-scale'
        style={{ maxWidth: '820px' }}
      >
        <ModalHeader toggle={toggle}>How Taskbarter Works?</ModalHeader>
        <ModalBody>
          <Barter />
          <br />
          Barter means 'exchange (goods or services) for other goods or services
          without using money'. Taskbarter helps you achieve flawless bartering.
          <br />
          <br />
          <ol>
            <li>
              You can find any job you want that you feel you are most expert
              in.
            </li>
            <li>
              Once you select a task, you can send proposal to the task owner
              and you can start chatting with the task owner directly using our
              messaging service.
            </li>
            <li>
              Once you both agree on certain terms, you can start working on the
              task using our Work Feature.{' '}
            </li>
            <li>
              After completing the task, you will be rewarded with the decided
              points.
            </li>
          </ol>
          <br />
          Once you've completed some tasks, you can hire people in the same way.
          You can add tasks using 'Add Task' button on the workspace.
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
