//socket for message sending, receiving and other events.

module.exports = function (socket, io, socket_connections) {
  socket.on('send_message', function (data) {
    const user_sockets = socket_connections.getAllConnectionsWithId(data.to);
    console.log(user_sockets);
    console.log(io);
    for (let u in user_sockets) {
      console.log(u);
      io.sockets.connected[u].emit('receive_message', data);
    }
    console.log(data.conv_id + " sent '" + data.text + "' to " + data.to);
  });
};
