//socket for adding, disconnecting users

module.exports = function(socket, io, socket_connections) {
  socket.on('add_user', function(data) {
    socket_connections.addConnection(socket, data);
    console.log('socket_connections', socket_connections.getAllConnections());
  });

  socket.on('disconnect', function() {
    socket_connections.deleteConnection(socket);
    console.log(
      'socket_connections after disconnection',
      socket_connections.getAllConnections()
    );
  });
};
