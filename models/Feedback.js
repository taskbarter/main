const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    work_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    state: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = Feedback = mongoose.model('feedbacks', FeedbackSchema);
