import {
  ADD_TASK,
  TASK_LOADING,
  GET_TASK,
  GET_TASKS,
  DELETE_TASK,
  GET_TASKS_COUNT,
  TASKS_COUNT_LOADING,
  APPEND_TASKS,
  EMPTY_TASKS
} from '../actions/types';

const initialState = {
  tasksCount: 0,
  tasks: [],
  task: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case TASK_LOADING:
      return {
        ...state,
        loading: true
      };

    case EMPTY_TASKS:
      return {
        ...state,
        tasks: [],
        loading: true
      };

    case GET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      };

    case APPEND_TASKS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.concat(action.payload)
      };

    case GET_TASKS_COUNT:
      return {
        ...state,
        loading: false,
        tasksCount: action.payload
      };
    case TASKS_COUNT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
