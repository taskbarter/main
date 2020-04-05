import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { userPersonalDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../style/messages.css';
import { Input } from 'reactstrap';
import UserList from './subs/UserList';

const users = [
  {
    name: 'Mohsin Hayat',
    username: 'mohsin',
    msg_time: Date.now(),
    last_msg: 'Hello yr kaisay ho? kafi din hogye milay nai kya hua'
  },

  {
    name: 'Daniyal Ikhlaq',
    username: 'daniyal',
    msg_time: Date.now(),
    last_msg: 'hello brother how are y...'
  }
];

class Messages extends Component {
  render() {
    return (
      <div className='msg-container messages'>
        <div className='conversations left-pane'>
          <div className='action-box'>
            <div className='search-container'>
              <Input
                type='search'
                name='search'
                id='exampleSearch'
                placeholder='search conversations'
                className='task-search-box'
              />
            </div>
          </div>
          <div className='task-list-title left-pane-title'>
            Your Recent Conversations
          </div>

          <div className='userlist-container'>
            <UserList users={users} />
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
