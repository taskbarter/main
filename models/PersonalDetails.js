const mongoose = require('mongoose');

const PersonalDetails = new mongoose.Schema({
      FName:    {type: String, required: true},
      LName:    {type:String, required: true},
      address:  {type:String, required: true},
      headline: {type:String, required: true},
      DobDay:   {type:String, required: true},
      DobMonth: {type:String, required: true},
      DobYear:  {type:String, required: true},
      PhoneNo:  {type:String, required: true},
      gender:   {type:String, required: true},
      
});

module.exports = Profile = mongoose.model('PersonalDetails', PersonalDetails);