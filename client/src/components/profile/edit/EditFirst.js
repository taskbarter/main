import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

const EditFirst = props => {
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
      maxHeight: '80%'
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const onSubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    // get the field that you want
    const userInputField = form.elements['gender'];
    alert(userInputField.value);
    console.log(e);
  };
  const onDoBChange = function(d) {
    console.log(d);
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel='Edit Profile Data'
    >
      <div className='notification-heading'>Edit Profile</div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='inputFirstName'>First Name</label>
              <input
                className='form-control profile-edit-col'
                type='text'
                placeholder='put first name here'
                id='inputFirstName'
                name='firstName'
                defaultValue={profile.first_name}
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='inputSecondName'>Last Name</label>
              <input
                className='form-control profile-edit-col'
                type='text'
                placeholder='put second name here'
                id='inputSecondName'
                name='secondName'
                defaultValue={profile.second_name}
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputTagline'>Tagline</label>
              <input
                className='form-control profile-edit-col'
                type='text'
                placeholder='put headline here'
                id='inputTagline'
                name='tagline'
                defaultValue={profile.headline}
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='textBio'>About You</label>
              <textarea
                className='form-control profile-edit-col'
                type='text'
                placeholder='put bio here'
                id='textBio'
                name='bio'
                defaultValue={profile.bio}
                rows='5'
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='selectGender'>Gender</label>
              <select
                className='form-control profile-edit-col'
                id='selectGender'
                name='gender'
              >
                <option selected={profile.gender === 'Male' ? 'true' : 'false'}>
                  Male
                </option>
                <option
                  selected={profile.gender === 'Female' ? 'true' : 'false'}
                >
                  Female
                </option>
                <option
                  selected={profile.gender === 'Other' ? 'true' : 'false'}
                >
                  Other
                </option>
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputLocation'>Location</label>
              <input
                className='form-control profile-edit-col'
                type='text'
                placeholder='put location here'
                id='inputLocation'
                name='location'
                defaultValue={profile.location}
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputLocation'>Date of Birth</label>
              <DatePicker
                className='form-control'
                selected={profile.dob || Date.now()}
                onChange={onDoBChange}
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className='float-right mt-2'>
            {' '}
            <button className='confirm-button' type='submit'>
              Save
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

export default EditFirst;
