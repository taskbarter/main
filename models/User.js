const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  sname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
});
module.exports = User = mongoose.model('users', UserSchema);
