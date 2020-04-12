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
import {
  getConversations,
  createConversation,
  sendMessage,
} from '../../actions/messageActions';

const users = [
  {
    name: 'Mohsin Hayat',
    username: 'mohsin',
    msg_time: Date.now(),
    last_msg: 'Hello yr kaisay ho? kafi din hogye milay nai kya hua',
    _id: '123456',
  },

  {
    name: 'Daniyal Ikhlaq',
    username: 'daniyal',
    msg_time: Date.now(),
    last_msg: 'hello brother how are y...',
    _id: '54321',
  },
];

const userObj = {
  first_name: 'Mohsin',
  second_name: 'Hayat',
  location: 'Lahore, Pakistan',
  memberSince: Date.now(),
  username: 'mohsin',
};

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: '',
      messages: [],
      other_user: { id: '123' },
      current_message: '',
      messagesEndRef: React.createRef(),
      conv_obj: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({ selected_convo: id });
    } else {
      this.setState({ selected_convo: '' });
    }
    //this.props.createConversation('5e9169c97fd65126c464081d');
    this.refreshConversations();
  }

  refreshConversations = () => {
    const { id } = this.props.match.params;
    this.props.getConversations(this.props.auth.user.id).then(() => {
      this.assignConvObj(id);
    });
  };
  assignConvObj = (id) => {
    for (let j in this.props.conversations) {
      if (this.props.conversations[j]._id === id) {
        this.setState({
          conv_obj: this.props.conversations[j],
        });
        break;
      }
    }
  };
  onConvoClick = (id) => {
    return this.setState(
      {
        selected_convo: id,
      },
      () => {
        this.assignConvObj(id);
      }
    );
  };
  onConvoClear = () => {
    return this.setState(
      {
        selected_convo: '',
      },
      () => {
        this.props.history.push('/messages');
      }
    );
  };

  getRightPaneClass = () => {
    if (this.state.selected_convo === '') {
      return 'chat-box outside-convo';
    } else {
      return 'chat-box';
    }
  };

  getLeftPaneClass = () => {
    if (this.state.selected_convo !== '') {
      return 'conversations left-pane inside-convo';
    } else {
      return 'conversations left-pane';
    }
  };

  onMessageType = (e) => {
    this.setState({ current_message: e.target.value });
  };

  onMessageSend = () => {
    const msg_text = this.state.current_message.trim();
    if (msg_text !== '') {
      let data = {
        text: this.state.current_message,
        to: this.state.other_user.id,
        from: this.props.auth.user.id,
        time: Date.now(),
      };

      let payload = {
        text: this.state.current_message,
        current_user: this.props.auth.user.id,
        conv_id: this.state.selected_convo,
      };

      this.props.sendMessage(payload).then(() => {
        this.state.messages.push(data);
        this.setState(
          {
            messages: this.state.messages,
          },
          () => {
            this.setState({
              current_message: '',
            });
            this.scrollToBottom();
            this.refreshConversations();
          }
        );
      });
      this.props.socket_connection.emit('send_message', data);
    }
  };

  scrollToBottom = () => {
    this.state.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
              conversation_list={this.props.conversations}
              selected_convo={this.state.selected_convo}
              onConvoClick={this.onConvoClick}
              history={this.props.history}
              current_user_id={this.props.auth.user.id}
            />
          </div>
        </div>
        <div className={this.getRightPaneClass()}>
          <ChatHeader
            selected_convo={this.state.selected_convo}
            onCloseBtn={this.onConvoClear}
            user={userObj}
            conv_obj={this.state.conv_obj}
            current_user_id={this.props.auth.user.id}
          />
          <ChatMessages
            selected_convo={this.state.selected_convo}
            msgs={this.state.messages}
            current_user={this.props.auth.user.id}
            endRef={this.state.messagesEndRef}
          />
          <ChatTextArea
            current_message={this.state.current_message}
            onMessageType={this.onMessageType}
            selected_convo={this.state.selected_convo}
            onMessageSend={this.onMessageSend}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socket_connection: state.socket.socket_connection,
  conversations: state.message.conversations,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  createConversation,
  getConversations,
  sendMessage,
})(Messages);
