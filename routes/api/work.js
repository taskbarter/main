const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');
const TaskUpdate = require('../../models/TaskUpdate');
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
  TASK_COMPLETED,
} = require('../../constants/state');
const { TASKUPDATE_COMPLETE } = require('../../constants/types');
const mongoose = require('mongoose');

// @route   GET api/work/fetch
// @desc    Get all work details
// @access  Private

router.get('/fetch/', auth, async (req, res) => {
  try {
    const work_id = req.query.id || '';
    if (work_id === '') {
      throw { msg: 'no id provided' };
    }
    const work_data = await Work.aggregate([
      {
        $match: {
          $and: [
            { _id: mongoose.Types.ObjectId(work_id) },
            {
              $or: [
                {
                  assignee: mongoose.Types.ObjectId(req.user.id),
                },
                {
                  assignedTo: mongoose.Types.ObjectId(req.user.id),
                },
              ],
            },
          ],
        },
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
          localField: '_id',
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

// @route POST api/work/update
// @desc Add new update to the task
// @access Private

router.post('/update', auth, async (req, res) => {
  try {
    const work_id = req.body.work_id;
    //Those who are involved in the work can post update.
    const Work_Obj = await Work.find({
      $and: [
        { _id: mongoose.Types.ObjectId(work_id) },
        {
          $or: [
            {
              assignee: mongoose.Types.ObjectId(req.user.id),
            },
            {
              assignedTo: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      ],
    });
    if (!Work_Obj) {
      return res.status(500).send('Not authorized for this action.');
    }

    const newTaskUpdate = new TaskUpdate({
      work_id: work_id,
      sender: req.user.id,
      text: req.body.text,
      type: req.body.type,
    });
    await newTaskUpdate.save();

    if (req.body.type === TASKUPDATE_COMPLETE) {
      //if task is accepted.
      const pTask = await Task.findById(Work_Obj[0].task);
      pTask.state = TASK_COMPLETED;
      await pTask.save();

      const pUserDetails = await PersonalDetails.findOne({
        user: Work_Obj[0].assignedTo,
      });

      pUserDetails.pointsEarned = pUserDetails.pointsEarned + pTask.taskpoints;
      await pUserDetails.save();
    }

    res.json(newTaskUpdate);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
