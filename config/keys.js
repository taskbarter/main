module.exports = {
  mongoURI: 'mongodb://localhost/taskbarter', //process.env.MONGO_URI,
  secretOrKey: 'secret',
  jwtSecret: 'mysecret',
  taskBarterGmail: process.env.EMAIL_ADDRESS,
  taskBarterPassword: process.env.EMAIL_PASSWORD
};
