module.exports = {
  //mongoURI: 'mongodb://localhost/taskbarter', //For local server localhost
  mongoURI: process.env.MONGO_URI, //For live Server taskbarter.com
  secretOrKey: 'ZZmmdassadadksmaosdm2143-0ads-asdlkads05tsag', //TODO: Change this before release
  jwtSecret: '65asdg7wq898vcdlknsvdlknalvko3teiyauwtsdklkasdfwq0p9oriubm', //TODO: Change this before release
  taskBarterGmail: process.env.EMAIL_ADDRESS,
  taskBarterPassword: process.env.EMAIL_PASSWORD,
};
