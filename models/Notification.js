const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    for: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      default: null, //Null means for everyone
    },
    seen: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = Notification = mongoose.model(
  'notifications',
  NotificationSchema
);
