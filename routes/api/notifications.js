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

// @route   Post api/notifications/read
// @desc    Read a notification
// @access  Private

router.post('/read', auth, async (req, res) => {
  try {
    const Notif = await Notification.findById(req.body.notif_id);
    const allNotifWithLink = await Notification.bulkWrite([
      {
        updateMany: {
          filter: { link: Notif.link, for: Notif.for, seen: false },
          update: { seen: true },
        },
      },
    ]);

    res.json({});
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ msg: 'Could not find notifications for this user.' });
  }
});

// @route   Post api/notifications/readall
// @desc    Read all notifications
// @access  Private

router.post('/readall', auth, async (req, res) => {
  try {
    const allNotifWithLink = await Notification.bulkWrite([
      {
        updateMany: {
          filter: { for: req.user.id, seen: false },
          update: { seen: true },
        },
      },
    ]);
    res.json({});
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ msg: 'Could not find notifications for this user.' });
  }
});

module.exports = router;
