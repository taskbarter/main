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
import ChatHeader from './subs/ChatHeader';
import ChatTextArea from './subs/ChatTextArea';
import ChatMessages from './subs/ChatMessages';
import socketIOClient from 'socket.io-client';

const users = [
  {
    name: 'Mohsin Hayat',
    username: 'mohsin',
    msg_time: Date.now(),
    last_msg: 'Hello yr kaisay ho? kafi din hogye milay nai kya hua',
    _id: '123456'
  },

  {
    name: 'Daniyal Ikhlaq',
    username: 'daniyal',
    msg_time: Date.now(),
    last_msg: 'hello brother how are y...',
    _id: '54321'
  }
];

const userObj = {
  first_name: 'Mohsin',
  second_name: 'Hayat',
  location: 'Lahore, Pakistan',
  memberSince: Date.now(),
  username: 'mohsin'
};

const messages = [
  {
    text: 'kaisa hai bro?',
    time: Date.now(),
    from: '123412'
  },
  {
    text: 'Theek bro. Tu kaisa hai?',
    time: Date.now(),
    from: '123123'
  },
  {
    text:
      'Main bhi theek. Kaam krday yr. 10 01 10 101 01 01 01 01 010 01 01 010 0 101 001 01010010101001101  101 10 101 01 1 0',
    time: Date.now(),
    from: '123412'
  },
  {
    text: 'Okay main krta hun.',
    time: Date.now(),
    from: '123123'
  },
  {
    text: 'bas 10 minute day.',
    time: Date.now(),
    from: '123123'
  }
];

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: ''
    };
  }
  componentDidMount() {
    const socket = socketIOClient(window.location.host);
    socket.emit('message_sent');
  }
  onConvoClick = id => {
    return this.setState({
      selected_convo: id
    });
  };
  onConvoClear = () => {
    return this.setState({
      selected_convo: ''
    });
  };

  getRightPaneClass = () => {
    if (this.state.selected_convo === '') {
      return 'chat-box outside-convo';
    } else {
      return 'chat-box';
    }
  };

  getLeftPaneClass = () => {
    console.log('sad');
    if (this.state.selected_convo !== '') {
      return 'conversations left-pane inside-convo';
    } else {
      return 'conversations left-pane';
    }
  };
  render() {
    return (
      <div className='msg-container messages'>
        <div className={this.getLeftPaneClass()}>
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
            <UserList
              users={users}
              selected_convo={this.state.selected_convo}
              onConvoClick={this.onConvoClick}
            />
          </div>
        </div>
        <div className={this.getRightPaneClass()}>
          <ChatHeader
            selected_convo={this.state.selected_convo}
            onCloseBtn={this.onConvoClear}
            user={userObj}
          />
          <ChatMessages
            selected_convo={this.state.selected_convo}
            msgs={messages}
          />
          <ChatTextArea selected_convo={this.state.selected_convo} />
        </div>
      </div>
    );
  }
}

export default Messages;
