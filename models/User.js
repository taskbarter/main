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
  accessLevel:{
    type: String,
    default: '1',
    required: true //1 mean basic user 2 mean admin etc 
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
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
