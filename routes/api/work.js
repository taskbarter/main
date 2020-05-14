const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');
const TaskUpdate = require('../../models/TaskUpdate');
const User = require('../../models/User');
const Proposal = require('../../models/Proposal');
const Work = require('../../models/Work');
const Feedback = require('../../models/Feedback');
const Conversation = require('../../models/Conversation');
const PersonalDetails = require('../../models/PersonalDetails');
const { check, validationResult } = require('express-validator');
const { MESSAGETYPE_PROPOSAL } = require('../../constants/types');
const { sendEmailUsingNode } = require('../../functions/sendEmail');
const UserActivity = require('../../models/UserActivity');
const {
  PROPOSAL_ACCEPTED,
  PROPOSAL_REJECTED,
  TASK_PENDING,
  TASK_ASSIGNED,
  TASK_COMPLETED,
} = require('../../constants/state');
const {
  TASKUPDATE_SUBMIT,
  TASKUPDATE_TEXT,
  TASKUPDATE_REJECT,
  TASKUPDATE_COMPLETE,
} = require('../../constants/types');
const { addNotification } = require('../../functions/notifications');
const mongoose = require('mongoose');

const { refreshOtherUser } = require('../../functions/notifications');

// @route   GET api/work/fetch
// @desc    Get all work details
// @access  Private

router.get('/fetch/', auth, async (req, res) => {
  try {
    const work_id = req.query.id || '';
    if (work_id === '' || !mongoose.Types.ObjectId.isValid(work_id)) {
      throw { message: 'wrong work id' };
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
      {
        $lookup: {
          from: 'feedbacks',
          localField: '_id',
          foreignField: 'work_id',
          as: 'feedback',
        },
      },
    ]);
    res.json({ work_data });
  } catch (err) {
    console.error(err);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while fetching work data`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send({ work_data: [] });
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
        { state: { $ne: TASKUPDATE_COMPLETE } },
      ],
    });
    if (!Work_Obj) {
      return res.status(500).send('Not authorized for this action.');
    }

    const other_user =
      req.user.id.toString() === Work_Obj[0].assignee.toString()
        ? Work_Obj[0].assignedTo
        : Work_Obj[0].assignee;

    const newTaskUpdate = new TaskUpdate({
      work_id: work_id,
      sender: req.user.id,
      text: req.body.text,
      type: req.body.type,
    });

    await newTaskUpdate.save();
    const pTask = await Task.findById(Work_Obj[0].task);

    const pUserDetails = await PersonalDetails.findOne({
      user: Work_Obj[0].assignedTo,
    });

    const user_info = await PersonalDetails.findOne({
      user: req.user.id,
    });

    if (req.body.type === TASKUPDATE_COMPLETE) {
      //if task is accepted.
      pTask.state = TASK_COMPLETED;
      await pTask.save();

      pUserDetails.pointsEarned = pUserDetails.pointsEarned + pTask.taskpoints;
      pUserDetails.tasksDone = parseInt(pUserDetails.tasksDone) + 1;
      await pUserDetails.save();

      addNotification(
        `${user_info.first_name} ${user_info.second_name} has accepted your work for the task '${pTask.headline}'`,
        other_user,
        `/w/${Work_Obj[0]._id}`
      );

      addNotification(
        `Congrats, you earned ${pTask.taskpoints} points for completing a task.`,
        other_user,
        `/w/${Work_Obj[0]._id}`
      );

      //SENDING EMAIL NOTIFICATION:
      const task_owner_user = await User.findById(other_user);
      const task_owner_prof = pUserDetails;
      sendEmailUsingNode(
        'Congrats! Work Accepted',
        task_owner_user.email,
        `${user_info.first_name} ${user_info.second_name} has accepted your work for the task '${pTask.headline}'.\n\nCongrats, you earned ${pTask.taskpoints} points for completing this task.`,
        task_owner_prof.first_name,
        task_owner_prof.second_name
      );
    }

    if (req.body.type === TASKUPDATE_REJECT) {
      addNotification(
        `${user_info.first_name} ${user_info.second_name} has rejected your work for the task '${pTask.headline}'`,
        other_user,
        `/w/${Work_Obj[0]._id}`
      );

      //SENDING EMAIL NOTIFICATION:
      const task_owner_user = await User.findById(other_user);
      const task_owner_prof = pUserDetails;
      sendEmailUsingNode(
        'Oh No! Work Rejected',
        task_owner_user.email,
        `${user_info.first_name} ${user_info.second_name} has rejected your work for the task '${pTask.headline}'.\n\nPost another update to let the user know about current status of the task and try again.`,
        task_owner_prof.first_name,
        task_owner_prof.second_name
      );
    }

    if (req.body.type === TASKUPDATE_SUBMIT) {
      addNotification(
        `${user_info.first_name} ${user_info.second_name} just submitted the work for the task '${pTask.headline}'. Please review.`,
        other_user,
        `/w/${Work_Obj[0]._id}`
      );

      //SENDING EMAIL NOTIFICATION:
      const task_owner_user = await User.findById(other_user);
      const task_owner_prof = pUserDetails;
      sendEmailUsingNode(
        'Work Submitted. Please Review',
        task_owner_user.email,
        `${user_info.first_name} ${user_info.second_name} just submitted the work for the task '${pTask.headline}'.\n\nReview the work and accept if it is complete or reject if it isn't.`,
        task_owner_prof.first_name,
        task_owner_prof.second_name
      );
    }

    if (req.body.type === TASKUPDATE_TEXT) {
      addNotification(
        `${user_info.first_name} ${user_info.second_name} posted a new update to the task '${pTask.headline}'`,
        other_user,
        `/w/${Work_Obj[0]._id}`
      );

      //SENDING EMAIL NOTIFICATION:
      const task_owner_user = await User.findById(other_user);
      const task_owner_prof = pUserDetails;
      sendEmailUsingNode(
        'New Work Update',
        task_owner_user.email,
        `${user_info.first_name} ${user_info.second_name} just posted a new update for the task '${pTask.headline}'.\n\nReview the update and let the user know with a followup update.`,
        task_owner_prof.first_name,
        task_owner_prof.second_name
      );
    }

    refreshOtherUser(work_id, other_user);
    new UserActivity({
      user_id: req.user.id,
      activity: `User submitted a new work update`,
      payload: JSON.stringify(req.body),
    }).save();
    res.json(newTaskUpdate);
  } catch (err) {
    console.error(err);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while adding a work update`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route POST api/work/feedback
// @desc Add new feedback to the work
// @access Private

router.post('/feedback', auth, async (req, res) => {
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
    return res.status(400).send('Not authorized for this action.');
  }

  const pTask = await Task.findById(Work_Obj[0].task);
  if (pTask.state !== TASK_COMPLETED) {
    return res.status(400).send('This task is not yet completed.');
  }

  const prevFeedback = await Feedback.findOne({
    work_id: mongoose.Types.ObjectId(work_id),
    from: mongoose.Types.ObjectId(req.user.id),
  });

  console.log(prevFeedback);
  if (prevFeedback) {
    return res.status(400).send('Feedback already submitted.');
  }
  const other_user =
    req.user.id.toString() === Work_Obj[0].assignee.toString()
      ? Work_Obj[0].assignedTo
      : Work_Obj[0].assignee;

  const newFeedback = new Feedback({
    from: req.user.id,
    work_id: work_id,
    text: req.body.text,
    rating: req.body.rating,
    to: other_user,
  });

  await newFeedback.save();
  res.json({ newFeedback });

  new UserActivity({
    user_id: req.user.id,
    activity: `User just posted a new feedback for Task: ${pTask.headline}`,
    payload: JSON.stringify(req),
  }).save();
});

module.exports = router;
