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
} from './types';

const url = ''; //'http://' + CURRENT_URL + ':' + CURRENT_PORT;
// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(url + '/api/users/register', userData)
    .then((res) => history.push('/login?v=1'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(url + '/api/users/login', userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      addToast('Logged in successfully!');
    })
    .catch((err) => {
      addToast(
        'Oops! There seems to be an error!\n' + err.response.data.message
      );
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearCurrentProfile());
  dispatch({
    type: RESET_SOCKET_CONNECTION,
  });
  addToast('Logged out successfully!');
};

// User Personal Information
export const userPersonalDetails = (userPersonalDetails, history) => (
  dispatch
) => {
  axios
    .post(url + '/api/users/userpersonaldetails', userPersonalDetails)
    .then(console.log('Suceessful'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Use google token
export const loginUsingToken = (token) => (dispatch) => {
  localStorage.setItem('jwtToken', token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
  dispatch(addToast('Logged in successfully!'));
};

// Use Google for Registration
export const registerUserWithGoogle = (userData, history) => (dispatch) => {
  axios
    .post(url + '/api/users/register', userData)
    .then((res) => {
      // Set token to Auth header
      setAuthToken(res.data.token);
      // Decode token to get user data
      const decoded = jwt_decode(res.data.token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(addToast('Logged in successfully!'));
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
