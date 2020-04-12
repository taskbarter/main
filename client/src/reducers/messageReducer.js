import { SET_CONVERSATIONS } from '../actions/types';
const initialState = {
  conversations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload
      };
    default:
      return state;
  }
}
