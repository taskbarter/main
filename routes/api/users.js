const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const deafult=require("../../config/default");
// To send Email
const nodemailer = require('nodemailer');
// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');
const PersonalDetails=require('../../models/PersonalDetails');



// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    User.findOne({ name: req.body.name }).then(user => {
      if (user) {
        return res.status(400).json({ email: 'Username already exists' });
      }
     else {
      const newUser = new User({
        sname: req.body.sname,
        fname: req.body.fname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            
          //Generate Token For email verification
          const tokenG={
            user:{
              id:newUser.id
            }
          };
          jwt.sign(
            tokenG,
            keys.jwtSecret,
            {
              expiresIn: 3600 // 1 hour
            },
            (err, token) => {
              if(err) throw err;
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                tls:{
                  rejectUnauthorized: false
              },
              auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_ADDRESS,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: process.env.GMAIL_ACCESS_TOKEN,
              }
              });
              
              var mailOptions = {
                from: keys.taskBarterGmail,
                to: newUser.email,
                subject: 'Taskbarter | Verify Your Email',
                text: 'Verify your email address by clicking on this link: https://localhost:3000/confirmation/'+token
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' );
                }
              });
            }
          );

          


      });
    
});
     }
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) =>
{
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.password;
  const name = req.body.email;

  //find user using username
  if (!name.includes('@')) {
    User.findOne({ name }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: 'Username not found' });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: 'Password incorrect' });
        }
      });
    });
  }

  const email = req.body.email;

  // Find user by email

  User.findOne({ email }).then(user => {
     
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check if email is confirmed 
    if(user.isEmailVerified==false)
    {
      return res.status(405).json({emailnotVerified: 'Please confirm your email to login' });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } 
      else 
      {
        if (email.includes('@')) 
        {
            User.findOne({ email }).then(user => {
              // Check if user exists
              if (!user) {
                  return res
                  .status(404)
                  .json({ emailnotfound: 'Email address not found' });
              }
              // Check password
              bcrypt.compare(password, user.password).then(isMatch => 
              {
                if (isMatch) {
                  // User matched
                  // Create JWT Payload
                  const payload = {
                    id: user.id,
                    name: user.name
                  };
                  // Sign token
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: 'Bearer ' + token
                      });
                    }
                  );
                }
                else 
                {
                  return res
                    .status(400)
                    .json({ passwordincorrect: 'Password incorrect' });
                }
        });
      });
    }
 }});
});
});

//User Personal Details
router.post('/userpersonaldetails',(req,res) =>
{
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userpersonaldetails = new PersonalDetails({
    FName: req.body.FName,
    Lname: req.body.LName,
    address:req.body.address,
    headline:req.body.headline,
    DobDay:req.body.DobDay,
    DobMonth:req.body.DobMonth,
    DobYear:req.body.DobYear,
    PhoneNo:req.body.PhoneNo,
    gender:req.body.gender
  });

  userpersonaldetails
            .save()
            .then(console.log('User details inserted'))
            .catch(err => console.log(err));
}); 

      
module.exports = router;
