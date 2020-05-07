var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'https://www.taskbarter.com/auth/facebook/callback',
        profileFields: ['id', 'email', 'displayName'],
      },
      async function (accessToken, refreshToken, profile, done) {
        var userData = {
          email: profile.emails[0].value || '',
          name: profile.displayName,
          token: accessToken,
          id: profile.id,
        };
        await User.findOne({ email: userData.email })
          .then((user) => {
            if (user) {
              // when user is found, create a JWT token:
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                isRegistered: true,
              };
              // Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                  payload.token = 'Bearer ' + token;
                  return done(null, payload);
                }
              );
            } else {
              userData.isRegistered = false;
              // Sign token

              jwt.sign(
                { new_email: userData.email },
                keys.secretOrKey,
                {
                  expiresIn: 86400, // 24 hours in seconds
                },
                (err, token) => {
                  const new_user = {
                    email: userData.email,
                    name: userData.name,
                    token: 'Bearer ' + token,
                    isRegistered: false,
                  };
                  console.log(new_user);
                  return done(null, new_user);
                }
              );
              //return done(null, false);
            }
          })
          .catch((err) => console.log(err));
        //done(null, userData);
      }
    )
  );
};
