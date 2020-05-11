import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS,
  ADMIN_ACTIVITIES,
  ADMIN_USERS,
} from '../actions/types';

const initialState = {
  activities: [],
  users: [],
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
    default:
      return state;
  }
}
