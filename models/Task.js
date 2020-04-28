const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { TASK_PENDING } = require('../constants/state');
const TaskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },

    duration: {
      type: Number,
      required: true,
    },
    taskpoints: {
      type: Number,
      required: true,
      default: 5,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
    state: {
      type: Number,
      required: true,
      default: TASK_PENDING,
    },
  },
  { timestamps: true }
);
module.exports = Task = mongoose.model('tasks', TaskSchema);
