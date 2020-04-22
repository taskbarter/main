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

  const [filter, setFilter] = useState({
    showRejected: true,
  });

  const toggleReject = () => {
    setFilter({
      showRejected: !filter.showRejected,
    });
  };
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
        <button onClick={toggleReject} className='btn btn-primary filter-btn'>
          {filter.showRejected ? (
            <span>
              <i class='fa fa-eye-slash' aria-hidden='true'></i>{' '}
              &nbsp;&nbsp;Hide Rejected
            </span>
          ) : (
            <span>
              <i class='fa fa-eye' aria-hidden='true'></i> &nbsp;&nbsp;Show
              Rejected
            </span>
          )}
        </button>
        {props.proposals.map((pros, id) => {
          if (!filter.showRejected && pros.status === 2) {
            return <div key={pros._id}></div>;
          }
          return (
            <div key={pros._id}>
              <div
                className={
                  pros.status
                    ? 'pro-list-container low-opacity'
                    : 'pro-list-container'
                }
              >
                <div className='task-list-title dt-title'>Proposal</div>
                <div>{pros.text}</div>
                <div className='feed-card--footer'>
                  <div className='pro-list-user feed-card--footer-left'>
                    Sent by:&nbsp;
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
                  <button
                    className={
                      pros.status
                        ? 'btn act-btn hide'
                        : 'btn act-btn _negotiate'
                    }
                    disabled={pros.status}
                  >
                    <i class='fa fa-paper-plane' aria-hidden='true'></i>{' '}
                    &nbsp;&nbsp;Negotiate
                  </button>
                </Link>
                <button
                  className={
                    pros.status === 0
                      ? 'btn act-btn _accept'
                      : pros.status === 1
                      ? 'btn act-btn _accept _accepted'
                      : 'btn act-btn hide'
                  }
                  onClick={() => {
                    props.onChangeProposalState(pros._id, 1);
                  }}
                  disabled={pros.status}
                >
                  <i className='fa fa-check' aria-hidden='true'></i> &nbsp;
                  {pros.status === 1 ? 'Accepted' : 'Accept'}
                </button>
                <button
                  className={
                    pros.status === 0
                      ? 'btn act-btn _reject'
                      : pros.status === 2
                      ? 'btn act-btn _reject _rejected'
                      : 'btn act-btn hide'
                  }
                  onClick={() => {
                    props.onChangeProposalState(pros._id, 2);
                  }}
                  disabled={pros.status}
                >
                  <i className='fa fa-times' aria-hidden='true'></i> &nbsp;
                  {pros.status === 2 ? 'Rejected' : 'Reject'}
                </button>
              </div>
            </div>
          );
        })}
      </ModalBody>
    </Modal>
  );
};

export default connect(null, {})(ProposalList);
