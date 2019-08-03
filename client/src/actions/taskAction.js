import axios from 'axios';

import {
  ADD_TASK,
  TASK_LOADING,
  GET_TASK,
  GET_TASKS,
  DELETE_TASK
} from '../actions/types';

// Add task
export const addTask = taskData => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/tasks/add');
    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
