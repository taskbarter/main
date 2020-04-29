const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

const addNotification = async (text, receiver, link) => {
  const newNotification = new Notification({
    text: text,
    for: receiver,
    link: link,
  });
  await newNotification.save();
};

module.exports = {
  addNotification,
};
