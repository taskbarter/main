module.exports = {
<<<<<<< HEAD
  // mongoURI: 'mongodb://localhost/taskbarter', //For local server localhost
=======
//   mongoURI: 'mongodb://localhost/taskbarter', //For local server localhost
>>>>>>> 3e1a5ff346fb87670dfab427d04d25117e84af32
  mongoURI: process.env.MONGO_URI, //For live Server taskbarter.com
  secretOrKey: 'secret', //TODO: Change this before release
  jwtSecret: 'mysecret', //TODO: Change this before release
  taskBarterGmail: process.env.EMAIL_ADDRESS,
  taskBarterPassword: process.env.EMAIL_PASSWORD,
};
