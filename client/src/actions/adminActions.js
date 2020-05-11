import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { clearCurrentProfile } from './profileAction';
import { addToast } from './toasterActions';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  RESET_SOCKET_CONNECTION,
  ADMIN_ACTIVITIES,
  ADMIN_USERS,
} from './types';

export const fetchActivities = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/admin/activities');
    dispatch({
      type: ADMIN_ACTIVITIES,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/admin/users');
    dispatch({
      type: ADMIN_USERS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};
