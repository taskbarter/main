import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import '../../../style/inc/react-datepicker.css';

const AddSecond = (props) => {
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

    if (form.elements['jobTitle'].value === '') {
      alert('Title cannot be empty');
      return;
    }
    if (form.elements['jobCompany'].value === '') {
      alert('Company cannot be empty');
      return;
    }
    let data = {
      title: form.elements['jobTitle'].value,
      company: form.elements['jobCompany'].value,
      from: props.currentFrom,
      to: props.currentTo,
      description: form.elements['jobDescription'].value,
      location: form.elements['jobLocation'].value,
      current: props.isCurrentlyWorking,
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
      <div className='notification-heading'>Add Experience</div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputFirstName'>Title</label>
              <input
                className='form-control profile-edit-col'
                type='text'
                placeholder='job title'
                id='inputFirstName'
                name='jobTitle'
                defaultValue={
                  profile.experience[props.selectedIndex]
                    ? profile.experience[props.selectedIndex].title
                    : ''
                }
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputTagline'>Company</label>
              <input
                className='form-control profile-edit-col'
                type='text'
                placeholder='company name'
                id='inputTagline'
                name='jobCompany'
                defaultValue={
                  profile.experience[props.selectedIndex]
                    ? profile.experience[props.selectedIndex].company
                    : ''
                }
              />
            </div>
          </div>

          <div className='form-row' style={{ marginTop: '5px' }}>
            <div className='form-group col-md-4'>
              <label htmlFor='inputLocation'>From {'  '}</label>
              {'   '} &nbsp;
              <DatePicker
                className='form-control'
                selected={props.currentFrom}
                onChange={props.onFromChanged}
                maxDate={props.currentTo}
                showYearDropdown
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                defaultValue={
                  profile.experience[props.selectedIndex]
                    ? profile.experience[props.selectedIndex].from
                    : ''
                }
              />
            </div>
            <div className='form-group col-md-4'>
              {!props.isCurrentlyWorking ? (
                <React.Fragment>
                  <label htmlFor='inputLocation'>To {'  '}</label>
                  {'   '} &nbsp;
                  <DatePicker
                    className='form-control'
                    selected={props.currentTo}
                    onChange={props.onToChanged}
                    minDate={props.currentFrom}
                    showYearDropdown
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    defaultValue={
                      profile.experience[props.selectedIndex]
                        ? profile.experience[props.selectedIndex].to
                        : ''
                    }
                  />
                </React.Fragment>
              ) : (
                ''
              )}
            </div>
            <div className='form-group col-md-4' style={{ paddingTop: '8px' }}>
              <input
                className='form-check-input'
                type='checkbox'
                name='jobCurrentlyWorking'
                value=''
                id='defaultCheck1'
                onChange={props.toggleCurrentlyWorking}
                value={props.isCurrentlyWorking}
                defaultChecked={props.isCurrentlyWorking}
                defaultValue={
                  profile.experience[props.selectedIndex]
                    ? profile.experience[props.selectedIndex].current
                    : true
                }
              />
              <label className='form-check-label' htmlFor='defaultCheck1'>
                I currently work here
              </label>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='textBio'>Job Description</label>
              <textarea
                className='form-control profile-edit-col'
                type='text'
                placeholder='mention your role and work'
                id='textBio'
                name='jobDescription'
                rows='5'
                defaultValue={
                  profile.experience[props.selectedIndex]
                    ? profile.experience[props.selectedIndex].description
                    : ''
                }
              />
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
                name='jobLocation'
                defaultValue={
                  profile.experience[props.selectedIndex]
                    ? profile.experience[props.selectedIndex].location
                    : ''
                }
              />
            </div>
          </div>
          <div className='float-right mt-2'>
            {' '}
            <button className='confirm-button' type='submit'>
              Save Experience
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

export default AddSecond;
