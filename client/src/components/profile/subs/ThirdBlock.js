import React from 'react';
import month from '../../../config/months_name';

const ThirdBlock = (props) => {
  const profile = props.profile;
  if (!profile) {
    return <div>Loading...</div>;
  }

  const getProjects = (projects) => {
    const temp_pro = projects;
    console.log(temp_pro);
    if (!temp_pro) {
      return '';
    }
    return temp_pro.map((pro, i) => (
      <div className='experience-row' key={i}>
        <div className='experience-company'>
          <span className='experience-title'>{pro.title}</span>
          {' | '} &nbsp;
          <a href={pro.link}>Project Link</a>
        </div>
        <div className='experience-date'>
          from {month[new Date(pro.from).getMonth()]}{' '}
          {new Date(pro.from).getFullYear()} to{' '}
          {!pro.current ? (
            <span>
              {month[new Date(pro.to).getMonth()]}{' '}
              {new Date(pro.to).getFullYear()}
            </span>
          ) : (
            'current'
          )}
        </div>
        <div className='experience-desc'>{pro.description}</div>
      </div>
    ));
  };

  const projectSection = (
    <div className='profile-badge-categories'>
      {getProjects(profile.projects)}
    </div>
  );

  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Project
        <button
          onClick={props.addModal}
          className='btn notification-btn float-right'
        >
          Add
        </button>
      </div>
      {profile.projects && profile.projects.length !== 0 ? (
        <div className='experience-container'>{projectSection}</div>
      ) : (
        'No project'
      )}
    </div>
  );
};

export default ThirdBlock;
