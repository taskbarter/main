import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// get profile

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      const artok = mtok.split(' ');
      console.log(artok[1]);
      // setAuthToken(mtok);
      axios.defaults.headers.common['x-auth-token'] = artok[1];
    }

    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE, //   get errors might be more graceful
      payload: {}
    });
  }
};

// create profile

export const createProfile = (profileData, history) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/profile', profileData, config);

    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
    history.push('/dashboard');
  } catch (err) {
    console.error(err);
  }
};

//Profile Loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear Profile

export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};
