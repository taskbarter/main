const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

const addNotification = async (text, receiver, link) => {
  const newNotification = new Notification({
    text: text,
    for: receiver,
    link: link,
  });
  const user_sockets = socket_connections.getAllConnections();
  for (let u in user_sockets) {
    if (user_sockets[u].id.toString() === receiver.toString()) {
      ioCon.connected[u].emit('notify_user', newNotification);
    }
  }
  await newNotification.save();
};

const refreshOtherUser = async (work_id, user_id) => {
  const user_sockets = socket_connections.getAllConnections();
  for (let u in user_sockets) {
    if (user_sockets[u].id.toString() === user_id.toString()) {
      ioCon.connected[u].emit('refresh_work_page', { work_id: work_id });
    }
  }
};

module.exports = {
  addNotification,
  refreshOtherUser,
};
