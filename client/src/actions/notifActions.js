import { SET_NOTIFICATIONS, ALL_NOTIFICATIONS_READ } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import socketIOClient from 'socket.io-client';

export const getNotifications = () => async (dispatch) => {
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
    console.log(res.data);
    let areAllNotificationsRead = true;
    for (let n in res.data) {
      if (!res.data[n].seen) {
        areAllNotificationsRead = false;
        break;
      }
    }
    dispatch({
      type: ALL_NOTIFICATIONS_READ,
      payload: areAllNotificationsRead,
    });
  } catch (err) {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: [],
    });
  }
};

export const readNotification = (notif_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.post(
      '/api/notifications/read',
      { notif_id: notif_id },
      config
    );
    dispatch(getNotifications());
  } catch (err) {
    console.error(err);
  }
};

export const readAllNotifications = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.post('/api/notifications/readall', {}, config);
    dispatch(getNotifications());
  } catch (err) {
    console.error(err);
  }
};
