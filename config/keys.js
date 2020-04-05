module.exports = {
  mongoURI: 'mongodb://localhost/taskbarter', //For local server localhost
  //mongoURI: process.env.MONGO_URI, //For live Server taskbarter.com
  secretOrKey: 'secret',
  jwtSecret: 'mysecret',
  taskBarterGmail: process.env.EMAIL_ADDRESS,
  taskBarterPassword: process.env.EMAIL_PASSWORD
};
