import { SET_NOTIFICATIONS, ALL_NOTIFICATIONS_READ } from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  notifications: [],
  read_flag: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case ALL_NOTIFICATIONS_READ:
      return {
        ...state,
        read_flag: action.payload,
      };
    default:
      return state;
  }
}
