import React from 'react';

const Notifications = () => {
  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Your Notifications
        <button className='btn notification-btn fl-r'>View All</button>
      </div>

      <div className='notification-block-first'>
        <div className='notification-entry'>
          Your task "Develop a Wordpress website.." is near its deadline. Mark
          it complete before the deadline ends.
        </div>
      </div>

      <div className='notification-block'>
        <div className='notification-entry'>
          The task you added has been cancelled because it violates our terms
          and conditions.
        </div>
      </div>

      <div className='notification-block'>
        <div className='notification-entry'>
          Anas Usman, Muhammad Nouman and 12 others have liked your task
          "Develop a new website..". Keep up the good work!
        </div>
      </div>
    </div>
  );
};

export default Notifications;
