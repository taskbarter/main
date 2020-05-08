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
import { Link } from 'react-router-dom';
import bookmark_icon from '../../../style/inc/bookmark.svg';
import share_icon from '../../../style/inc/share.svg';
import { fetchTask } from '../../../actions/taskAction';
import { connect } from 'react-redux';
import moment from 'moment';
import TLoader from '../../utils/TLoader';
import checkmark_icon from '../../../style/inc/checkmark.svg';
import RatingStars from './RatingStars';

const FeedbackForm = (props) => {
  const { modal, toggle } = props;

  const [feedback, setfeedback] = useState({});

  useEffect(() => {}, [feedback]);

  const handleChange = (newfeedback) => {
    setfeedback(newfeedback);
  };

  const modalOpened = () => {};

  const modalClosed = () => {
    setfeedback({});
  };

  const onStarChange = (d) => {
    props.onFeedbackStarChange(d);
  };

  if (!feedback) {
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
      className='fb-modal fade-scale'
    >
      <ModalHeader toggle={toggle} className='dt-header'></ModalHeader>
      <ModalBody className='dt-body'>
        <div className='feedback-top'>
          <img className='done-icon' src={checkmark_icon} />
          <div className='cong-text'>Congrats, the work is now complete!</div>
        </div>
        <div className='feedback-mid row'>
          <div className='rate-work col-md-7'>
            How do you rate the work from the user?
          </div>
          <div className='col-md-5'>
            <RatingStars
              onStarChange={onStarChange}
              feedback_stars={props.feedback_stars}
            />
          </div>
        </div>

        <div className='feedback-bottom'>
          <div className='rate-work'>Write a feeback about the work</div>
          <textarea
            value={props.feedback_text}
            className='form-control feedback-box'
            placeholder='Your feedback...'
            onChange={props.onFeedbackTextChange}
          />
        </div>
        <div className='feedback-action'>
          <button
            onClick={props.onFeedbackSubmit}
            className='btn btn-primary btn-feedback'
          >
            Submit
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default connect(null, {
  fetchTask,
})(FeedbackForm);
