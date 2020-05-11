import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS,
  ADMIN_ACTIVITIES,
  ADMIN_USERS,
  ADMIN_TASKS,
} from '../actions/types';

const initialState = {
  activities: [],
  users: [],
  tasks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case ADMIN_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADMIN_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
}
