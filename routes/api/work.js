const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');
const User = require('../../models/User');
const Proposal = require('../../models/Proposal');
const Work = require('../../models/Work');
const Conversation = require('../../models/Conversation');
const PersonalDetails = require('../../models/PersonalDetails');
const { check, validationResult } = require('express-validator');
const { MESSAGETYPE_PROPOSAL } = require('../../constants/types');
const {
  PROPOSAL_ACCEPTED,
  PROPOSAL_REJECTED,
  TASK_PENDING,
  TASK_ASSIGNED,
} = require('../../constants/state');
const mongoose = require('mongoose');

// @route   GET api/work/fetch
// @desc    Get all work details
// @access  Private

router.get('/fetch/', async (req, res) => {
  try {
    const work_id = req.query.id || '';
    if (work_id === '') {
      throw { msg: 'no id provided' };
    }
    const work_data = await Work.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(work_id) },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'taskDetails',
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'assignedTo',
          foreignField: 'user',
          as: 'assignedTo',
        },
      },
      {
        $lookup: {
          from: 'taskupdates',
          localField: 'task',
          foreignField: 'work_id',
          as: 'taskUpdates',
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'assignee',
          foreignField: 'user',
          as: 'assignee',
        },
      },
    ]);
    res.json({ work_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
