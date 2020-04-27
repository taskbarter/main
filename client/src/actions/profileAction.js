import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  REMOVE_SKILL,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { createConnection } from './socketActions';
import jwt_decode from 'jwt-decode';
import { set } from 'mongoose';
import { addToast } from './toasterActions';

// get profile

export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/profile/me');
    createConnection(res.data.user);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE, //   get errors might be more graceful
      payload: {},
    });
  }
};

// create profile

export const createProfile = (profileData, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/profile', profileData, config);

    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
    history.push('/dashboard');
  } catch (err) {
    console.error(err);
  }
};

//Search Profile
export const searchUser = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/profile/user/' + id);
    // addToast('Welcome back ' + res.data.user.name);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//Profile Loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//Clear Profile

export const clearCurrentProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE,
  });
};

export const updateProfile = (profileData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/profile/update', profileData, config);
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const updateStatus = (newStatus) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      '/api/profile/updatestatus',
      { status: newStatus },
      config
    );
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const addExperience = (newExperience) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(newExperience);
  try {
    const res = await axios.put(
      '/api/profile/experience',
      newExperience,
      config
    );
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const editExperience = (newExperience, index) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(newExperience);
  try {
    const res = await axios.post(
      '/api/profile/experience/' + index,
      newExperience,
      config
    );
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const deleteExperience = (index) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.delete('/api/profile/experience/' + index, config);
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const addProject = (newProject) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(newProject);
  try {
    const res = await axios.put('/api/profile/project', newProject, config);
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const editProjects = (newProjects, index) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(newProjects);
  try {
    const res = await axios.post(
      '/api/profile/project/' + index,
      newProjects,
      config
    );
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const deleteProject = (index) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.delete('/api/profile/project/' + index, config);
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const addSkill = (newSkill) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(newSkill);
  try {
    const res = await axios.put('/api/profile/skill', newSkill, config);
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const addLink = (newLink) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(newLink);
  try {
    const res = await axios.post('/api/profile/link', newLink, config);
    dispatch(getCurrentProfile()); // yup working dispatch syncronized now
  } catch (err) {
    console.error(err);
  }
};

export const removeSkill = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: REMOVE_SKILL,
    payload: id,
  });
  try {
    const res = await axios.post(
      '/api/profile/removeskill',
      { skill_id: id },
      config
    );
    dispatch(getCurrentProfile());
  } catch (err) {
    console.error(err);
  }
};
