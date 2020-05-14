import React, { useState } from 'react';

import moment from 'moment';
import TLoader from '../../utils/TLoader';

const UserList = (props) => {
  const getConvoCardClass = (conv) => {
    if (props.selected_convo === conv._id) {
      return 'convo-card is-selected';
    } else {
      return 'convo-card';
    }
  };
  const handleCardClick = (id) => {
    if (props.selected_convo !== id) {
      props.history.push('/messages/' + id);
      props.onConvoClick(id);
    }
  };

  if (props.convo_loading && !props.conversation_list.length) {
    return (
      <React.Fragment>
        <div className='mt-4'>
          <TLoader colored={true} />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {props.conversation_list.map((conv, i) => {
        const user =
          conv.user1 === props.current_user_id
            ? conv.user2_details[0]
            : conv.user1_details[0];
        if (
          props.search_convos_text !== '' &&
          !(
            user.first_name +
            ' ' +
            user.second_name +
            ' ' +
            conv.last_message[0].text
          )
            .toLowerCase()
            .includes(props.search_convos_text.toLowerCase())
        ) {
          return <div></div>;
        }
        return (
          <div
            onClick={() => handleCardClick(conv._id)}
            className={getConvoCardClass(conv)}
            key={i}
          >
            <span className='avatar'>
              <img src='/inc/Mohsin_DP.jpg' className='rounded avatar-image' />
            </span>
            <div className='personal-info'>
              <div className='name'>
                {user.first_name} {user.second_name}
                {conv.unseen_message.length ? (
                  <span className='unseen-marker'></span>
                ) : (
                  ''
                )}
              </div>
              <div className='lastmsg'>
                {conv.last_message[0] !== undefined &&
                conv.last_message[0].sender === props.current_user_id
                  ? 'you: '
                  : ''}
                {conv.last_message[0] ? (
                  conv.last_message[0].text
                ) : (
                  <i>no message</i>
                )}
              </div>

              <span></span>
            </div>
            <div className='date-icon-block'>
              <div className='date'>
                {conv.last_message[0]
                  ? moment(conv.last_message[0].createdAt).fromNow()
                  : ''}
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default UserList;
