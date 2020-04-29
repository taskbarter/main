import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import taskReducer from './taskReducer';
import socketReducer from './socketReducer';
import messageReducer from './messageReducer';
import notifReducer from './notifReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  task: taskReducer,
  socket: socketReducer,
  message: messageReducer,
  notifications: notifReducer,
});
