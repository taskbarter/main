const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkSchema = new Schema(
  {
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
      required: true,
    },
    state: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = Work = mongoose.model('work', WorkSchema);
