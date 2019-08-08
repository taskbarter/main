import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  ADD_TASK,
  TASK_LOADING,
  GET_TASK,
  GET_TASKS,
  DELETE_TASK
} from '../actions/types';

// Add task
export const addTask = (taskData, history) => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const body = JSON.stringify(taskData);

    const res = await axios.post('/api/tasks/add', body, config);

    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
    //history.push('/dashboard');
    return true;
  } catch (err) {
    console.log('res.data inside err');

    console.log(err);
    return false;
  }
};

// get profile

export const getAllTasks = () => async dispatch => {
  console.log('here1');

  dispatch(setTaskLoading());
  console.log('here2');

  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }

    const res = await axios.get('/api/tasks');

    dispatch({
      type: GET_TASKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_TASKS, //   get errors might be more graceful
      payload: {}
    });
  }
};

export const toggleLike = id => async dispatch => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    console.log('LIKE');

    const res = await axios.put(`/api/tasks/like/${id}`);

    dispatch(getAllTasks());
  } catch (err) {
    dispatch({
      type: GET_TASKS, //   get errors might be more graceful
      payload: {}
    });
  }
};

export const setTaskLoading = () => {
  return {
    type: TASK_LOADING
  };
};
