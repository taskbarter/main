//TODO: Add more relevant fields such as 'Block Conversation' or 'Disable Notification' etc.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkSchema = new Schema(
  {
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = Work = mongoose.model('work', WorkSchema);
