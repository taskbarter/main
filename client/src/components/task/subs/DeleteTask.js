import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import '../../../style/inc/react-datepicker.css';

const DeleteTask = (props) => {
  const profile = props.profile;
  const customStyles = {
    content: {
      top: '54%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      minWidth: '80%',
      maxHeight: '80%',
    },
  };

  const onSubmit = function (e) {
    props.deleteTask();
    props.closeModal();
  };
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel='Delete Task'
    >
      <div className='notification-heading'>Confirm Delete</div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-row'>Are you sure you want to delete?</div>

          <div className='float-right mt-2'>
            {' '}
            <button className='confirm-button' onClick={onSubmit}>
              Confirm
            </button>{' '}
            <button className='cancel-button' onClick={props.closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteTask;
