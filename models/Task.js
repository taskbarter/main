const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
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
  taskpoints: {
    type: Number,
    required: true,
    default: 5
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      review: {
        type: Number,
        default: 0
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  proposals: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        // even after deletion of account it will be possible to show posts
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
module.exports = Task = mongoose.model('tasks', TaskSchema);
