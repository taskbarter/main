// Class for socket connections
module.exports = function (arr = {}) {
  //dictionary for all the connections
  this.connections = arr;

  this.getAllConnections = function () {
    return this.connections;
  };

  this.addConnection = function (socket, data) {
    this.connections[socket.id] = data;
  };

  this.getAllConnectionsWithId = function (id) {
    let arr = [];
    for (let c in this.connections) {
      if (this.connections[c].id === id) {
        arr[c] = this.connections[c];
      }
    }
    return arr;
  };

  this.deleteConnection = function (data) {
    var user = this.connections[data.id];
    if (user != undefined && user.id != undefined) {
      delete this.connections[data.id];
      console.log(user.id + ' disconnected');
    }
  };

  this.deleteConnectionBySocketId = function (id) {
    var user = this.connections[id];
    if (user != undefined && user.id != undefined) {
      delete this.connections[id];
      console.log(user.id + ' disconnected');
    }
  };

  this.getConnectionBySocketId = function (id) {
    return this.connections[id];
  };

  this.getConnection = function (socket) {
    return this.connections[socket.id];
  };
};
