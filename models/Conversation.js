//TODO: Add more relevant fields such as 'Block Conversation' or 'Disable Notification' etc.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConversationSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});
module.exports = Conversation = mongoose.model(
  'conversations',
  ConversationSchema
);
