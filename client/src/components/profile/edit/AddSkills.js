import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import '../../../style/inc/react-datepicker.css';

const AddSkills = (props) => {
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

  const onSubmit = function (e) {
    e.preventDefault();
    const form = e.target;

    if (form.elements['skill'].value === '') {
      alert('Skill cannot be empty');
      return;
    }
    let data = {
      skill: form.elements['skill'].value,
    };
    //console.log(data);
    props.submitForm(data);
  };
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel='Edit Profile Data'
    >
      <div className='notification-heading'>Add Skill</div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <input
                className='form-control profile-edit-col fa-search'
                type='text'
                placeholder='Skill (ex: Machine Learning)'
                id='inputFirstName'
                name='skill'
              />
            </div>
          </div>

          <div className='float-right mt-2'>
            {' '}
            <button className='confirm-button' type='submit'>
              Add Skill
            </button>{' '}
            <button className='cancel-button' onClick={props.closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSkills;
