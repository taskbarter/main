//socket for message sending, receiving and other events.

module.exports = function(socket, io) {
  socket.on('message_sent', function() {
    console.log('message has been sent');
  });
};
