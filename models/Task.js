const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  skills: {
    type: Array,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  feedback_id: {
    type: String,
    default: false
  },
  duration: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 5
  },
  rating: {
    type: Number,
    default: 0
  }
});
module.exports = Task = mongoose.model('tasks', TaskSchema);
