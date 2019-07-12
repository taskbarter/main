const jwt = require('jsonwebtoken');
const config = require('config');
const keys = require('../config/keys');
// secret magical formula mixations theory

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');
  //check if not token

  if (!token) {
    return res.status(401).json({ msg: 'no token, Authourization denied' });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, keys.secretOrKey);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Token not valid' }] }); // return ??
  }
};
