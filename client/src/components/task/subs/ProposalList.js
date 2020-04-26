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
import { connect } from 'react-redux';
import TLoader from '../../utils/TLoader';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProposalList = (props) => {
  const { modal, toggle } = props;

  const handleChange = (newTask) => {};
  const modalOpened = () => {};
  const modalClosed = () => {};

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      onOpened={modalOpened}
      onClosed={modalClosed}
      className='dt-modal fade-scale'
    >
      <ModalHeader toggle={toggle} className='dt-header'>
        <div className='dt-title'>All Proposals</div>
      </ModalHeader>
      <ModalBody className='dt-body'>
        {props.proposals.map((pros, id) => {
          return (
            <React.Fragment>
              <div className='pro-list-container' key={pros.id}>
                <div className='task-list-title dt-title'>Proposal</div>
                <div>{pros.text}</div>
                <div className='feed-card--footer'>
                  <div className='pro-list-user feed-card--footer-left'>
                    Sent by: &nbsp;
                    <span className='user-name'>
                      {pros.userdetails[0].first_name}{' '}
                      {pros.userdetails[0].second_name}
                    </span>
                  </div>
                  <div className='posted-on feed-card--footer-right'>
                    sent {moment(pros.createdAt).fromNow()}
                  </div>
                </div>
              </div>
              <div className='pro-list-action'>
                <Link to={`/messages/`}>
                  <button className='btn act-btn _negotiate'>
                    <i class='fa fa-paper-plane' aria-hidden='true'></i>{' '}
                    &nbsp;Negotiate
                  </button>
                </Link>
                <button className='btn act-btn _accept'>
                  <i class='fa fa-check' aria-hidden='true'></i> &nbsp; Accept
                </button>
                <button className='btn act-btn _reject'>
                  <i class='fa fa-times' aria-hidden='true'></i> &nbsp; Reject
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </ModalBody>
    </Modal>
  );
};

export default connect(null, {})(ProposalList);
