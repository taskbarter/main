//TODO: Add more relevant fields
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserActivitySchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      default: null,
    },
    activity: {
      type: String,
      default: '',
    },
    //Boolean representing whether the receiver has seen this update or not
    payload: {
      type: String,
      default: '',
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = UserActivity = mongoose.model(
  'useractivity',
  UserActivitySchema
);
