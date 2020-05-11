const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const UserActivity = require('../models/UserActivity');
const User = require('../models/User');

// @route   GET api/admin/activities
// @desc    Get all activities
// @access  Private

router.get('/activities', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.json({ msg: 'you are not admin!' });
    }
    const acts = await UserActivity.aggregate([
      {
        $match: {
          type: 0,
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          let: { user_id_temp: '$user_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$user_id', null] },
                    { $eq: ['$user', '$$user_id_temp'] },
                  ],
                },
              },
            },
          ],
          as: 'user_details',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 100,
      },
      {
        $project: {
          activity: 1,
          createdAt: 1,
          payload: 1,
          user_details: {
            first_name: 1,
            second_name: 1,
          },
        },
      },
    ]);
    res.json(acts);
  } catch (err) {
    return res.status(400).json({ msg: 'Could not find activities.' });
  }
});

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private

router.get('/users', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.json({ msg: 'you are not admin!' });
    }
    const users = await User.aggregate([
      {
        $match: {
          accessLevel: '1',
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: '_id',
          foreignField: 'user',
          as: 'user_details',
        },
      },
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'user',
          as: 'proposals',
        },
      },
      {
        $sort: {
          lastVisitedOn: -1,
        },
      },

      {
        $project: {
          name: 1,
          email: 1,
          lastVisitedOn: 1,
          user_details: {
            first_name: 1,
            second_name: 1,
            pointsEarned: 1,
            pointsSpent: 1,
            tasksDone: 1,
            tasksPosted: 1,
            tasksCanceled: 1,
          },
          proposal_sent: { $size: '$proposals' },
        },
      },
    ]);
    res.json(users);
  } catch (err) {
    return res.status(400).json({ msg: 'Could not find activities.' });
  }
});

module.exports = router;
