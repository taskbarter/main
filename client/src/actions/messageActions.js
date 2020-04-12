import { SET_CONVERSATIONS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import socketIOClient from 'socket.io-client';

export const getConversations = (user_id) => async (dispatch) => {
  try {
    const mtok = localStorage.jwtToken;
    if (mtok) {
      setAuthToken(mtok);
    }
    console.log('user: ', user_id);
    const res = await axios.get('/api/messages/conversations', {
      params: { u: user_id },
    });
    dispatch({
      type: SET_CONVERSATIONS,
      payload: res.data,
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
