const mongoose = require('mongoose');

const PersonalDetails = new mongoose.Schema({
  first_name: { type: String, required: true },
  second_name: { type: String, required: true },
  address: { type: String, required: false },
  headline: { type: String, required: false },
  dob_day: { type: String, required: false },
  dob_month: { type: String, required: false },
  dob_year: { type: String, required: false },
  phone_num: { type: String, required: false },
  gender: { type: String, required: false }
});

module.exports = Profile = mongoose.model('PersonalDetails', PersonalDetails);
