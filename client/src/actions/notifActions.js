import { SET_NOTIFICATIONS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import socketIOClient from 'socket.io-client';

export const getNotifications = (user_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/notifications', {});
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: [],
    });
  }
};
