const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const app = express();

const keys = require('./config/keys');

var path = require('path');

const tasks = require('./routes/api/tasks');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);

//get verification response
app.get('/confirmation/:token', async (request, response) => {
  try {
    const {
      user: { id }
    } = jwt.verify(request.params.token, keys.jwtSecret);
    let nUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isEmailVerified: true } },
      { new: true }
    );
    console.log('Verified');
    return response.redirect('/UserInfo');
  } catch (e) {
    return response.send('Unable to verify your email');
  }
});

app.use('/api/tasks', tasks);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`TaskBarter First Msg on ${port}!`));
