const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const messages = require('./routes/api/messages');
const task_work = require('./routes/api/work');
const search = require('./routes/api/search');
const notifications = require('./routes/api/notifications');
const app = express();
const socket = require('socket.io');
const keys = require('./config/keys');

var path = require('path');

const tasks = require('./routes/api/tasks');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

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
      user: { id },
    } = jwt.verify(request.params.token, keys.jwtSecret);
    let nUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isEmailVerified: true } },
      { new: true }
    );
    console.log('Verified', nUser);
    console.log('id', id);
    return response.redirect('/login?v=2');
  } catch (e) {
    console.log(e);
    return response.send('Unable to verify your email err: ' + e.message);
  }
});

app.use('/api/tasks', tasks);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/messages', messages);
app.use('/api/search', search);
app.use('/api/work', task_work);
app.use('/api/notifications', notifications);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// for socket connections:
const Socket_Connections = require('./functions/socket_connections');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let socket_connections = new Socket_Connections();

io.on('connection', function (socket) {
  console.log('user connected..');
  require('./sockets/user_socket')(socket, io, socket_connections);
  require('./sockets/messages_socket')(socket, io, socket_connections);
  require('./sockets/notification_socket')(socket, io, socket_connections);
  return io;
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
server.listen(port, () => console.log(`TaskBarter First Message on ${port}!`));
