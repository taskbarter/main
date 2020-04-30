import { SET_SOCKET_CONNECTION } from '../actions/types';
const initialState = {
  socket_connection: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET_CONNECTION:
      if (!state.socket_connection.id) {
        return {
          ...state,
          socket_connection: action.payload,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
}
