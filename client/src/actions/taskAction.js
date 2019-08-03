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
export const addTask = taskData => async dispatch => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    console.log('token added');
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log('bfrs');
  try {
    console.log('res.data');
    console.log(taskData);
    const body = JSON.stringify(taskData);
    console.log(body);

    const res = await axios.post('/api/tasks/add', body, config);
    console.log(res.data);

    dispatch({
      type: ADD_TASK,
      payload: res.data
    });
  } catch (err) {
    console.log('res.data inside err');

    console.log(err);
  }
};
