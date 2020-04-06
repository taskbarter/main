//socket for notification sending, receiving and other events.

module.exports = function(socket, io) {
  socket.on('notify_user', function() {
    console.log('user will be notified here');
  });
};
