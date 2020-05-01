import { SET_SOCKET_CONNECTION, RESET_SOCKET_CONNECTION } from './types';
import socketIOClient from 'socket.io-client';
import { getNotifications } from './notifActions';
import { addToast } from './toasterActions';
import { Link } from 'react-router-dom';
import React from 'react';

export const createConnection = (auth) => async (dispatch) => {
  const socket = await socketIOClient(window.location.host);
  let data = {
    id: auth.user.id,
  };
  socket.emit('add_user', data);
  dispatch({
    type: SET_SOCKET_CONNECTION,
    payload: socket,
  });
  //dispatch(listenForEvents(socket));
};

export const listenForEvents = (socket) => async (dispatch) => {
  socket.on('notify_user', (data) => {
    console.log('NOTIFICATION REFRESHED', data);
    dispatch(
      addToast(
        <div>
          {data.text}{' '}
          <Link style={{ color: 'white', fontWeight: '600' }} to={data.link}>
            (View)
          </Link>
        </div>
      )
    );
    dispatch(getNotifications());
  });
};
