import { SET_NOTIFICATIONS } from '../actions/types';
import update from 'react-addons-update';

const initialState = {
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

    default:
      return state;
  }
}
