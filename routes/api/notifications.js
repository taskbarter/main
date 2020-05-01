const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const Notification = require('../../models/Notification');

// @route   GET api/notifications
// @desc    Get all notifications
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const tNotifications = await Notification.find({ for: req.user.id })
      .sort({
        createdAt: -1,
      })
      .limit(50);
    res.json(tNotifications);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Could not find notifications for this user.' });
  }
});

module.exports = router;
