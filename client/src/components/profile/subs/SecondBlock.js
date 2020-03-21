import React from 'react';
import month from '../../../config/months_name';

const SecondBlock = props => {
  const profile = props.profile;
  if (!profile) {
    return <div>Loading...</div>;
  }

  const getExperiences = experience => {
    const temp_exp = experience;
    console.log(temp_exp);
    if (!temp_exp) {
      return '';
    }
    return temp_exp.map((exp, i) => (
      <div className='experience-row' key={i}>
        <span className='experience-title'>{exp.title}</span>
        <div className='experience-company'>
          {exp.company}
          {'  '} &nbsp;
          <span className='experience-location'>{exp.location}</span>
        </div>
        <div className='experience-date'>
          from {month[new Date(exp.from).getMonth()]}{' '}
          {new Date(exp.from).getFullYear()} to{' '}
          {!exp.current ? (
            <span>
              {month[new Date(exp.to).getMonth()]}{' '}
              {new Date(exp.to).getFullYear()}
            </span>
          ) : (
            'current'
          )}
        </div>
        <div className='experience-desc'>{exp.description}</div>
      </div>
    ));
  };

  const experienceSection = (
    <div className='profile-badge-categories'>
      {getExperiences(profile.experience)}
    </div>
  );

  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Experience
        <button
          onClick={props.addModal}
          className='btn notification-btn float-right'
        >
          Add
        </button>
      </div>
      {profile.experience && profile.experience.length !== 0 ? (
        <div className='experience-container'>{experienceSection}</div>
      ) : (
        'No experience'
      )}
    </div>
  );
};

export default SecondBlock;
