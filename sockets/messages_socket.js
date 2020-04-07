//socket for message sending, receiving and other events.

module.exports = function(socket, io) {
  socket.on('send_message', function(data) {
    console.log(data.from + " sent '" + data.text + "' to " + data.to);
  });
};
