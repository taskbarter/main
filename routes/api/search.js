const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Task = require('../../models/Task');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { check, validationResult } = require('express-validator');



// @route   GET api/search
// @desc    route for searching
// @access  Private
router.get('/:query/:skills/:categories/:people/:comptasks/:mytasks/:webcontent',  async (req, res) => {
  // search parameters
  try {

    var resObj={
      skills:[],
      categories:[],
      people:[],
      comptasks:[],
      mytasks:[],
      webcontent:[]
    }

    if (req.params.skills==1){
      const task = await Task.find({ skills: { $all: req.params.query.toString() } });

      resObj.skills.push(task);
    }
    if (req.params.categories==1){
      const task = await Task.find({ category: req.params.query.toString()});
      resObj.categories.push(task);
      
    }
    if (req.params.people==1){
      resObj.people.push("people");
      
    }
    if (req.params.comptasks==1){
      resObj.comptasks.push("comptasks");
      
    }
    if (req.params.mytasks==1){
      resObj.mytasks.push("mytasks");
      
    }
    if (req.params.webcontent==1){
      resObj.webcontent.push("webcontent");
      
    }
   
    res.json(resObj);
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
