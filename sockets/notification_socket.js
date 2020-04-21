//socket for notification sending, receiving and other events.
// TODO: Add notification features
module.exports = function(socket, io) {
  socket.on('notify_user', function() {
    console.log('user will be notified here');
  });
};
