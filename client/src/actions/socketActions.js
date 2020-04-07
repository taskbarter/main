import { SET_SOCKET_CONNECTION } from './types';
import socketIOClient from 'socket.io-client';

export const createConnection = auth => async dispatch => {
  const socket = socketIOClient(window.location.host);
  let data = {
    id: auth.user.id
  };
  socket.emit('add_user', data);
  dispatch({
    type: SET_SOCKET_CONNECTION,
    payload: socket
  });
};
