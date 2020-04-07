import { SET_SOCKET_CONNECTION } from '../actions/types';
const initialState = {
  socket_connection: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET_CONNECTION:
      return {
        ...state,
        socket_connection: action.payload
      };
    default:
      return state;
  }
}
