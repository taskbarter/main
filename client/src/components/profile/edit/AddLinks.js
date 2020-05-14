import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import '../../../style/inc/react-datepicker.css';

const AddLinks = (props) => {
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

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  const linkValid = function (url, siteLink) {
    if (url === '') {
      return 1;
    } else if (url.includes(siteLink) && url.match(regex)) {
      return 1;
    } else {
      return 0;
    }
  };

  const onSubmit = function (e) {
    e.preventDefault();
    const form = e.target;

    if (!linkValid(form.elements['youtube'].value, 'youtube.com')) {
      alert('Invalid Youtube Link');
      return;
    }

    if (!linkValid(form.elements['twitter'].value, 'twitter.com')) {
      alert('Invalid Twitter Link');
      return;
    }
    if (!linkValid(form.elements['facebook'].value, 'facebook.com')) {
      alert('Invalid Facebook Link');
      return;
    }
    if (!linkValid(form.elements['linkedin'].value, 'linkedin.com')) {
      alert('Invalid Linkedin Link');
      return;
    }
    if (!linkValid(form.elements['instagram'].value, 'instagram.com')) {
      alert('Invalid Instagram Link');
      return;
    }

    let data = {
      youtube: form.elements['youtube'].value,
      twitter: form.elements['twitter'].value,
      facebook: form.elements['facebook'].value,
      linkedin: form.elements['linkedin'].value,
      instagram: form.elements['instagram'].value,
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
      <div className='notification-heading'>Add Links</div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputFirstName'>Youtube</label>
              <input
                className='form-control profile-edit-col fa-search'
                type='text'
                placeholder='Youtube Channel Link'
                id='inputFirstName'
                name='youtube'
                defaultValue={profile.social ? profile.social.youtube : ''}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputFirstName'>Twitter</label>
              <input
                className='form-control profile-edit-col fa-search'
                type='text'
                placeholder='Twitter Profile Link'
                id='inputFirstName'
                name='twitter'
                defaultValue={profile.social ? profile.social.twitter : ''}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputFirstName'>Linkedin</label>
              <input
                className='form-control profile-edit-col fa-search'
                type='text'
                placeholder='Linkedin profile Link'
                id='inputFirstName'
                name='linkedin'
                defaultValue={profile.social ? profile.social.linkedin : ''}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputFirstName'>Facebook</label>
              <input
                className='form-control profile-edit-col fa-search'
                type='text'
                placeholder='Facebook profile Link'
                id='inputFirstName'
                name='facebook'
                defaultValue={profile.social ? profile.social.facebook : ''}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputFirstName'>Instagram</label>
              <input
                className='form-control profile-edit-col fa-search'
                type='text'
                placeholder='Instagram profile Link'
                id='inputFirstName'
                name='instagram'
                defaultValue={profile.social ? profile.social.instagram : ''}
              />
            </div>
          </div>

          <div className='float-right mt-2'>
            {' '}
            <button className='confirm-button' type='submit'>
              Save Changes
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

export default AddLinks;
