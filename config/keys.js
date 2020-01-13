module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: 'secret',
  jwtSecret: 'mysecret',
  taskBarterGmail: process.env.EMAIL_ADDRESS,
  taskBarterPassword: process.env.EMAIL_PASSWORD
};
