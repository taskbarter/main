//TODO: Add more relevant fields
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conversations',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  //Boolean representing whether the receiver has seen this message or not
  seen: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  //for quoting messages, such as 'Reply To Message' feature
  quote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'messages',
    default: null,
  },
  //for Attachments or special type of messages.
  content_type: {
    type: Number,
    default: 0,
  },
  //for content like attachment code or something other than message text
  content_payload: {
    type: String,
    default: '',
  },
});
module.exports = Message = mongoose.model('messages', MessageSchema);
