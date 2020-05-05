import React, { Component } from 'react';
import debounce from 'lodash/debounce';
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

import {
  getConversations,
  createConversation,
  sendMessage,
  getMessages,
  addMessage,
} from '../../actions/messageActions';

import { createConnection } from '../../actions/socketActions';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      selected_convo: '',
      other_user: { id: '123' },
      current_message: '',
      messagesEndRef: React.createRef(),
      conv_obj: {},
      isTyping: false,
      isCurrentUserTyping: false,
      search_convos_text: '',
      filtered_convos: [],
      convo_loading: false,
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
    this.recheckSocket();
  }

  recheckSocket = async () => {
    if (!this.props.socket_connection.id) {
      await this.props.createConnection(this.props.auth);
    }
    this.props.socket_connection.on('receive_message', (data) => {
      let payload2 = {
        text: data.text,
        sender: data.sender,
        time: new Date(data.createdAt),
        conv_id: data.conv_id,
      };
      this.props.addMessage(this.state.selected_convo, payload2).then(() => {
        this.scrollToBottom();
      });
    });
    this.props.socket_connection.on('user_started_typing', (data) => {
      if (data.conv_id === this.selected_convo) {
        this.setState({ isTyping: true });
      }
    });
    this.props.socket_connection.on('user_stopped_typing', (data) => {
      if (data.conv_id === this.selected_convo) {
        this.setState({ isTyping: false });
      }
    });
  };

  refreshConversations = () => {
    const { id } = this.props.match.params;
    this.setState({ convo_loading: true }, () => {
      this.props.getConversations(this.props.auth.user.id).then(() => {
        this.assignConvObj(id);
        this.setState({ convo_loading: false });
      });
    });
  };

  assignConvObj = (id) => {
    for (let j in this.props.conversations) {
      if (this.props.conversations[j]._id === id) {
        this.setState(
          {
            conv_obj: this.props.conversations[j],
            isTyping: false,
          },
          () => {
            this.props.getMessages(id).then(() => {
              this.scrollToBottom();
            });
          }
        );
        break;
      }
    }
  };
  assignEndRef = (newRef) => {
    this.setState({
      messagesEndRef: newRef,
    });
  };
  onConvoClick = async (id) => {
    return this.setState(
      {
        selected_convo: id,
      },
      async () => {
        await this.assignConvObj(id);
        this.scrollToBottom();
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
    this.setState(
      { current_message: e.target.value, isCurrentUserTyping: true },
      () => {
        let data = {
          conv_id: this.state.conv_id,
          sender: this.props.auth.user.id,
          to: this.getOtherUserId(),
        };
        this.props.socket_connection.emit('user_started_typing', data);
        this.onTypingMsg();
      }
    );
  };

  getOtherUserId = () => {
    return this.state.conv_obj.user1 === this.props.auth.user.id
      ? this.state.conv_obj.user2
      : this.state.conv_obj.user1;
  };
  onMessageSend = () => {
    const msg_text = this.state.current_message.trim();
    const other_user =
      this.state.conv_obj.user1 === this.props.auth.user.id
        ? this.state.conv_obj.user2
        : this.state.conv_obj.user1;

    if (msg_text !== '') {
      let data = {
        text: this.state.current_message,
        to: other_user,
        conv_id: this.state.selected_convo,
        sender: this.props.auth.user.id,
        createdAt: Date.now(),
      };

      let payload = {
        text: this.state.current_message,
        current_user: this.props.auth.user.id,
        conv_id: this.state.selected_convo,
      };

      let payload2 = {
        text: this.state.current_message,
        sender: this.props.auth.user.id,
        createdAt: Date.now(),
        conv_id: this.state.selected_convo,
      };

      this.props.sendMessage(payload).then(() => {
        this.props.addMessage(this.state.selected_convo, payload2);
        this.setState({}, () => {
          this.setState({
            current_message: '',
          });
          this.scrollToBottom();
          this.refreshConversations();
        });
      });
      if (this.props.socket_connection)
        this.props.socket_connection.emit('send_message', data);
    }
  };

  onTypingMsg = debounce(function () {
    this.setState({ isCurrentUserTyping: false }, () => {
      let data_typing = {
        conv_id: this.state.conv_id,
        sender: this.props.auth.user.id,
        to: this.getOtherUserId(),
      };
      this.props.socket_connection.emit('user_stopped_typing', data_typing);
    });
  }, 3000);

  scrollToBottom = () => {
    if (this.state.messagesEndRef.current)
      this.state.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  onSearchConvos = (e) => {
    this.setState({
      search_convos_text: e.target.value,
    });
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
                value={this.state.search_convos_text}
                onChange={this.onSearchConvos}
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
              search_convos_text={this.state.search_convos_text}
              convo_loading={this.state.convo_loading}
            />
          </div>
        </div>
        <div className={this.getRightPaneClass()}>
          <ChatHeader
            selected_convo={this.state.selected_convo}
            onCloseBtn={this.onConvoClear}
            conv_obj={this.state.conv_obj}
            current_user_id={this.props.auth.user.id}
            isTyping={this.state.isTyping}
          />
          <ChatMessages
            selected_convo={this.state.selected_convo}
            current_user={this.props.auth.user.id}
            endRef={this.state.messagesEndRef}
            assignEndRef={this.assignEndRef}
            msgs={this.props.messages[this.state.selected_convo]}
            isTyping={this.state.isTyping}
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
  messages: state.message,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  createConversation,
  getConversations,
  sendMessage,
  getMessages,
  addMessage,
  createConnection,
})(Messages);
