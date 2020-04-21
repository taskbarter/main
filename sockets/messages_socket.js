//socket for message sending, receiving and other events.

module.exports = function (socket, io, socket_connections) {
  socket.on('send_message', function (data) {
    const user_sockets = socket_connections.getAllConnectionsWithId(data.to);
    for (let u in user_sockets) {
      io.sockets.connected[u].emit('receive_message', data);
    }
  });

  socket.on('user_started_typing', function (data) {
    const user_sockets = socket_connections.getAllConnectionsWithId(data.to);
    for (let u in user_sockets) {
      io.sockets.connected[u].emit('user_started_typing', data);
    }
  });

  socket.on('user_stopped_typing', function (data) {
    const user_sockets = socket_connections.getAllConnectionsWithId(data.to);
    for (let u in user_sockets) {
      io.sockets.connected[u].emit('user_stopped_typing', data);
    }
  });
};
