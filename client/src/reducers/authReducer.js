import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ERRORS:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
}
