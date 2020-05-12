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
  ADD_PUBLISHED_TASKS,
  ADD_WORKING_TASKS,
  ADD_AVAILABLE_TASKS,
  ADD_COMPLETED_TASKS,
  ADD_ARCHIVED_TASKS,
  ADD_ASSIGNED_TASKS,
  ADD_PAUSED_TASKS,
  ADD_CURRENTLY_WORKING_TASK,
  ADD_COMPLETED_WORKING_TASK,
  ADD_PENDING_PROPOSALS,
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
    return res.data;
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

// fetch task for unauth users
export const fetchTaskPublic = (task_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get(`/api/tasks/fetchPublic`, {
      params: { id: task_id },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// fetch task for edit. Different because of validation checks.

export const fetchTaskForEdit = (task_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get(`/api/tasks/edit`, {
      params: { id: task_id },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Edit task status.

export const editTaskStatus = (payload) => async (dispatch) => {
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
    const res = await axios.post('/api/tasks/editstatus', payload, config);
    dispatch(addToast('Task status is now changed.'));
  } catch (err) {
    console.log(err);
    dispatch(addToast('Oops! ' + err.message));
  }
};

//Edit Task content:

export const editTaskContent = (payload) => async (dispatch) => {
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
    const res = await axios.post('/api/tasks/edit', payload, config);
    dispatch(addToast('Task has been successfully updated.'));
    return true;
  } catch (err) {
    console.log(err);
    dispatch(addToast('Oops! ' + err.message));
    return false;
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
    if (res.data.msg) {
      dispatch(addToast('Proposal not sent: ' + res.data.msg));
    } else {
      dispatch(addToast('Proposal has been sent'));
      dispatch(fetchPendingProposals());
    }
  } catch (err) {
    console.log(err);
    dispatch(addToast('Oops! ' + err.message));
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

export const fetchPendingProposals = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/proposals_pending', {});

    let arr = [];
    for (let k in res.data.proposalData) {
      if (res.data.proposalData[k].applied_tasks.length) {
        arr.push(res.data.proposalData[k]);
      }
    }
    dispatch({
      type: ADD_PENDING_PROPOSALS,
      payload: arr,
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchWork = (work_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/work/fetch', {
      params: { id: work_id },
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const changeProposalState = (proposal_id, new_state) => async (
  dispatch
) => {
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
      '/api/tasks/proposal_state',
      { proposal_id, new_state },
      config
    );
    if (new_state === 1) {
      addToast('Proposal has been accepted successfully.');
    } else {
      addToast('Proposal has been rejected.');
    }

    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchPublishedTasks = (limit = -1) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/published', {
      params: { lim: limit },
    });
    dispatch({
      type: ADD_PUBLISHED_TASKS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchMyAvailableTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/myavailable', {
      params: { state: 0 },
    });
    dispatch({
      type: ADD_AVAILABLE_TASKS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchCompletedTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/completed_tasks');
    dispatch({
      type: ADD_COMPLETED_TASKS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchArchivedTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/mytasks', {
      params: { state: 3 },
    });
    dispatch({
      type: ADD_ARCHIVED_TASKS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchAssignedTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/assigned_tasks');
    dispatch({
      type: ADD_ASSIGNED_TASKS,
      payload: res.data,
    });
    console.log('ASSIGNED API CALLED', res.data);
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const fetchPausedTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/mytasks', {
      params: { state: 2 },
    });
    dispatch({
      type: ADD_PAUSED_TASKS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    addToast('Oops! Some error has occurred! ' + err.message);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    console.log(id);
    const res = await axios.delete('/api/tasks/' + id);
    dispatch({
      type: DELETE_TASK,
      payload: res.data,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};

export const fetchWorkingTasks = (limit = -1) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/working', {
      params: { lim: limit },
    });
    dispatch({
      type: ADD_WORKING_TASKS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};

export const fetchCurrentlyWorkingTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/currentlyworking');
    dispatch({
      type: ADD_CURRENTLY_WORKING_TASK,
      payload: res.data,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};

export const fetchCompletedWorkingTasks = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/tasks/completedworking');
    dispatch({
      type: ADD_COMPLETED_WORKING_TASK,
      payload: res.data,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};

export const sendWorkUpdate = (update_obj) => async (dispatch) => {
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
    const res = await axios.post('/api/work/update', update_obj, config);
    dispatch(addToast('Your update has been posted successfully.'));
    return res.data;
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};

export const submitFeedback = (newFeedback) => async (dispatch) => {
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
    const res = await axios.post('/api/work/feedback', newFeedback, config);
    dispatch(addToast('Feedback has been submitted successfully.'));
  } catch (err) {
    dispatch(addToast('Oops! Some error has occurred! ' + err.message));
  }
};
