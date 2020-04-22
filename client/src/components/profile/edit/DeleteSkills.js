import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import '../../../style/inc/react-datepicker.css';

const DeleteSkills = (props) => {
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

  if (!profile) {
    return <div>Loading...</div>;
  }

  const skillsbadges2 = (skills) => {
    if (skills) {
      let fsix = skills;
      return fsix.map((skl, i) => (
        <div className='form-group col-md-12'>
          <div className='form-control profile-edit-col' key={i}>
            {skl}
            <button
              onClick={() => props.deleteSKillFunc(i)}
              style={{ marginLeft: '23px' }}
              className='btn notification-btn float-right'
            >
              <i class='fas fa-times'></i>
            </button>
          </div>
        </div>
      ));
    }
  };

  const closeSkills = () => {
    alert('Close in DeleteSKills');
    props.setSkills(profile.skills);
    props.closeModal();
  };

  const skillSection = (
    <div className='profile-badge-categories'>
      {skillsbadges2(props.tempSkills)}
    </div>
  );

  const onSubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    //console.log(data);
    props.submitForm();
  };
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={() => props.setSkills(profile.skills)}
      onRequestClose={closeSkills}
      ariaHideApp={false}
      style={customStyles}
      contentLabel='Edit Profile Data'
    >
      <div className='notification-heading'>Edit Skills</div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-row'>{skillSection}</div>

          <div className='float-right mt-2'>
            {' '}
            <button className='confirm-button' type='submit'>
              Confirm
            </button>{' '}
            <button className='cancel-button' onClick={closeSkills}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteSkills;
