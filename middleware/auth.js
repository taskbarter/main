const jwt = require('jsonwebtoken');
const config = require('config');
const keys = require('../config/keys');
// secret magical formula mixations theory

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('Authorization');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'no token, Authourization denied' });
  }

  // verify token
  try {
    const artok = token.split(' ');
    const decoded = jwt.verify(artok[1], keys.secretOrKey);
    req.user = {};
    req.user.id = decoded.id;
    req.user.isAdmin = decoded.isAdmin;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Token not valid' }] }); // return ??
  }
};
