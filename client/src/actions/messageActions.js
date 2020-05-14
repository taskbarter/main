import {
  SET_CONVERSATIONS,
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_UNSEEN_CONVO,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import socketIOClient from 'socket.io-client';

export const getConversations = () => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/messages/conversations', {});
    dispatch({
      type: SET_CONVERSATIONS,
      payload: res.data,
    });
    let areThereUnseenMessages = false;
    for (let k in res.data) {
      if (res.data[k].unseen_message.length) {
        areThereUnseenMessages = true;
        break;
      }
    }
    dispatch({
      type: SET_UNSEEN_CONVO,
      payload: areThereUnseenMessages,
    });
  } catch (err) {
    dispatch({
      type: SET_CONVERSATIONS,
      payload: [],
    });
  }
};

export const createConversation = (user_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let conv_with = {
      user2: user_id,
    };

    const res = await axios.post(
      '/api/messages/conversation',
      conv_with,
      config
    );

    dispatch(getConversations());
  } catch (err) {
    console.log('error', err);
  }
};

export const sendMessage = (payload) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const msg_payload = {
      conversation: payload.conv_id,
      sender: payload.current_user,
      text: payload.text,
    };

    const res = await axios.post('/api/messages/send', msg_payload, config);
  } catch (err) {
    console.log('error', err);
  }
};

export const getMessages = (conv_id, shouldAppend = true) => async (
  dispatch
) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    const res = await axios.get('/api/messages/', {
      params: { c: conv_id },
    });
    dispatch({
      type: SET_MESSAGES,
      payload: res.data,
      conv_id: conv_id,
    });
  } catch (err) {
    dispatch({
      type: SET_MESSAGES,
      payload: [],
      conv_id: conv_id,
    });
  }
};

export const addMessage = (conv_id, msg) => async (dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: msg,
    conv_id: conv_id,
  });
};

export const readAllMessages = (conv_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const payload = {
      conversation: conv_id,
    };

    const res = await axios.post('/api/messages/readall', payload, config);
    dispatch(getConversations());
  } catch (err) {
    console.log('error', err);
  }
};
