const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    test route
// @access  Public
router.get('/', auth, async (req, res) => {
  // to make it protected simply add second (auth middleware) parameter

  try {
    const user = await User.findById(req.user.id).select('-password'); // leave of the password
    res.json(user);
    //res.send('Auth Route');           imp to keep in try block
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// for user login authentication

module.exports = router;
