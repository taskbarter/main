import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  ADD_TASK,
  TASK_LOADING,
  GET_TASK,
  GET_TASKS,
  DELETE_TASK,
  TASKS_COUNT_LOADING,
  GET_TASKS_COUNT,
  APPEND_TASKS,
  EMPTY_TASKS,
  SET_WORKPLACE_TASKS,
} from '../actions/types';

import { addToast } from './toasterActions';

// Add task
export const addTask = (taskData, history) => async (dispatch) => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const body = JSON.stringify(taskData);

    const res = await axios.post('/api/tasks/add', body, config);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    //history.push('/dashboard');
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// explore tasks

export const doExplore = (filters = {}, append = true) => async (dispatch) => {
  dispatch(setTaskLoading());
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    if (!append) {
      dispatch({
        type: EMPTY_TASKS,
      });
    }
    const res = await axios.get(`/api/tasks/explore`, { params: filters });
    if (append) {
      dispatch({
        type: APPEND_TASKS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_TASKS, //   get errors might be more graceful
      payload: {},
    });
  }
};

//get tasks for workplace

export const fetch_workplace_tasks = () => async (dispatch) => {
  const filters = { c: 0, z: 2 };
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get(`/api/tasks/explore`, { params: filters });
    dispatch({
      type: SET_WORKPLACE_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_WORKPLACE_TASKS, //   get errors might be more graceful
      payload: [],
    });
  }
};

// fetch task

export const fetchTask = (task_id) => async (dispatch) => {
  try {
    console.log('fetchTask -> task_id', task_id);
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get(`/api/tasks/fetch`, {
      params: { id: task_id },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// get profile

export const getAllTasks = (t = 0, s = 0) => async (dispatch) => {
  var total_tasks = t || 0; // zero means all
  var skip_tasks = s || 0; // zero means all
  dispatch(setTaskLoading());

  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    console.log(total_tasks);
    const res = await axios.get(`/api/tasks/${total_tasks}/${skip_tasks}`);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TASKS, //   get errors might be more graceful
      payload: {},
    });
  }
};

export const getTasksCount = () => async (dispatch) => {
  dispatch({
    type: TASKS_COUNT_LOADING,
  });
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }

    const res = await axios.get(`/api/tasks/taskscount`);
    dispatch({
      type: GET_TASKS_COUNT,
      payload: res.data,
    });
    // think if reduces neede or not
  } catch (err) {
    console.log('Get total tasks count error');
  }
};
export const toggleLike = (id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }

    const res = await axios.put(`/api/tasks/like/${id}`);
    //  why call again??
    //dispatch(getAllTasks());
  } catch (err) {
    dispatch({
      type: GET_TASKS, //   get errors might be more graceful
      payload: {},
    });
  }
};

export const sendProposal = (payload) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.post('/api/tasks/sendproposal', payload, config);
    addToast('Proposal has been sent');
  } catch (err) {
    console.log(err);
    addToast('Oops! ' + err.message);
  }
};

export const setTaskLoading = () => {
  return {
    type: TASK_LOADING,
  };
};

export const fetchProposals = (task_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/proposals', {
      params: { id: task_id },
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};
