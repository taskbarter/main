import {
  ADD_TASK,
  TASK_LOADING,
  GET_TASK,
  GET_TASKS,
  DELETE_TASK
} from '../actions/types';

const initialState = {
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

    case GET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      };
    default:
      return state;
  }
}
