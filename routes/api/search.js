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
router.get('/:query/:skills/:categories/:people/:comptasks/:mytasks/:webcontent', auth,  async (req, res) => {
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
      // search tasks by skills
      const task = await Task.find({ skills: { $all: req.params.query.toString() } });
      resObj.skills.push(task);
    }
    if (req.params.categories==1){
      // search tasks by categories
      const task = await Task.find({ category: req.params.query.toString()});
      resObj.categories.push(task);
      
    }
    if (req.params.people==1){
      //user name search
      const users = await User.find({ name: req.params.query.toString()});    
      resObj.people.push(users);
      
    }
    // TODO filter by completed tasks
    if (req.params.comptasks==1){
      // completed tasks of currently login user  
      const tasks = await Task.find({ user: req.user.id});
      resObj.comptasks.push(tasks);
      
    }
    if (req.params.mytasks==1){
      const tasks = await Task.find({ user: req.user.id});
      resObj.mytasks.push(tasks);
      
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
