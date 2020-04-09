import React from 'react';
import '../../style/notifications.css';
import NotificationItem from '../notifications/subs/NotificationItem';

const notifs = [
  {
    text: `Your task 'create new website' has been completed by Anas Usman.`,
    time: Date.now(),
    link_to: '/tasks/312',
    _id: '123456'
  },
  {
    text: `Your task 'proofread this text' has been deleted as it violates our terms and conditions`,
    time: Date.now(),
    link_to: '/tasks/612',
    _id: '123457'
  },
  {
    text: `You haven't updated your profile yet. Update it to get matched jobs on Taskbarter`,
    time: Date.now(),
    link_to: '/tasks/21',
    _id: '123458'
  }
];

const Notifications = props => {
  const onViewAllBtn = () => {
    props.history.push('/notifications');
  };
  return (
    <div className='card card-body mb-2'>
      <div className='notification-heading'>
        Your Notifications
        <button onClick={onViewAllBtn} className='btn notification-btn fl-r'>
          View All
        </button>
      </div>
      <div className='notif-list'>
        {notifs.map((notif, key) => {
          return <NotificationItem notif={notif} key={key} />;
        })}
      </div>
    </div>
  );
};

export default Notifications;
