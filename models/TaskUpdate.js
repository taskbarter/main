//TODO: Add more relevant fields
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskUpdateSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    //Boolean representing whether the receiver has seen this update or not
    seen: {
      type: Boolean,
      default: false,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'taskupdates',
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = TaskUpdate = mongoose.model('taskupdates', TaskUpdateSchema);
