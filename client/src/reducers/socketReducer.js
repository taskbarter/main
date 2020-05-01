import {
  SET_SOCKET_CONNECTION,
  RESET_SOCKET_CONNECTION,
} from '../actions/types';
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
    case RESET_SOCKET_CONNECTION:
      return {
        ...state,
        socket_connection: {},
      };
    default:
      return state;
  }
}
