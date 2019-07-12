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

// @route   GET api/auth
// @desc    authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 400 responce for bad request
    }
    const { email, password } = req.body;

    // instead of mongoose.findOne.then()

    try {
      // See if user exists
      let user = await User.findOne({ email }); //email:email so we can write single
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] }); // array of errors
      }
      // user found now for password match

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // return webtoken

      const payload = {
        user: {
          id: user.id // id created earlier on the local app even before saving to database
        }
      };
      // user that already have an account and tries to access others with change in id so we need token
      // user must be the one that provided credentials
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 360000 }, //  makee it 1 hours
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send('User Registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
