const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');
const User = require('../../models/User');
const Proposal = require('../../models/Proposal');
const Work = require('../../models/Work');
const Conversation = require('../../models/Conversation');
const PersonalDetails = require('../../models/PersonalDetails');
const UserActivity = require('../../models/UserActivity');
const { check, validationResult } = require('express-validator');
const { MESSAGETYPE_PROPOSAL } = require('../../constants/types');
const {
  PROPOSAL_ACCEPTED,
  PROPOSAL_REJECTED,
  TASK_PENDING,
  TASK_ASSIGNED,
  TASK_COMPLETED,
  TASK_PAUSED,
  TASK_ARCHIVED,
} = require('../../constants/state');
const mongoose = require('mongoose');
const { addNotification } = require('../../functions/notifications');
const { sendEmailUsingNode } = require('../../functions/sendEmail');
// @route POST api/tasks/add
// @desc Add new Task
// @access Private

// only those having account must add task to ensure security ?
router.post('/add', auth, async (req, res) => {
  if (!req.body.headline) {
    return res
      .status(404)
      .json({ headlineNotFound: 'Headline cannot be empty!' });
  }

  const profile = await PersonalDetails.findOne({
    user: req.user.id,
  });

  const currentPoints = profile.pointsEarned - profile.pointsSpent;

  if (currentPoints < parseInt(req.body.points)) {
    return res.status(500).send('Insufficient balance.');
  }

  if (parseInt(req.body.points) < 1) {
    return res.status(500).send('You cannot add a task with 0 points.');
  }

  profile.pointsSpent =
    parseInt(profile.pointsSpent) + parseInt(req.body.points);

  profile.tasksPosted = parseInt(profile.tasksPosted) + 1;

  await profile.save();

  const newTask = new Task({
    headline: req.body.headline,
    description: req.body.description,
    category: req.body.category,
    skills: req.body.skills,
    user: req.user.id, // for secure task adding
    duration: req.body.duration,
    taskpoints: req.body.points,
  });
  newTask
    .save()
    .then(async (task) => {
      addNotification(
        `Your task '${task.headline}' is now live for public.`,
        profile.user,
        `/t/${task._id}`
      );
      new UserActivity({
        user_id: req.user.id,
        activity: `User added a new task. '${task.headline}'`,
      }).save();

      //SENDING EMAIL NOTIFICATION:
      const task_owner_user = await User.findById(req.user.id);
      const task_owner_prof = profile;

      sendEmailUsingNode(
        'Task Published',
        task_owner_user.email,
        `Congrats, your task with the headline 'I want someone to ${task.headline}' has been published on Taskbarter. Wait for people to send proposals.`,
        task_owner_prof.first_name,
        task_owner_prof.second_name
      );

      return res.json(task);
    })
    .catch((err) => {
      console.error(err);
      new UserActivity({
        user_id: req.user.id,
        activity: `User ran into a problem while adding task`,
        payload: JSON.stringify(err.message),
      }).save();
      return res.status(500).send('Server Error');
    });
});

// @route   GET api/tasks/explore
// @desc    Get all tasks with filtering, sorting and lazy loading
// @access  Public         // login to see tasks

/*
@VARIABLES:
s='' (search query)
k='' (skill filter)
i='' (industry filter)
r='' (sort by filter)
l='' (location filter)
c=0 (current segment for lazy loading)
z=0 (segment size)
*/

router.get('/explore', async (req, res) => {
  try {
    const search_query = (req.query.s && req.query.s.toString()) || '';
    const skill_query = (req.query.k && req.query.k.toString()) || '';
    const category_query = (req.query.i && req.query.i.toString()) || '';
    const location_filter = (req.query.l && req.query.l.toString()) || '';
    const sort_by = (req.query.r && req.query.r.toString()) || '';
    const segment_number = parseInt(req.query.c) || 0;
    const segment_size = parseInt(req.query.z) || 6;

    let search_filter = {};
    if (search_query) {
      search_filter = {
        $or: [
          {
            description: new RegExp('\\b' + search_query + '', 'i'),
          },
          {
            headline: new RegExp('\\b' + search_query + '', 'i'),
          },
        ],
      };
    }
    let category_filter = {};
    if (category_query !== '' && category_query !== '[]') {
      const category_query_arr = JSON.parse(category_query);
      category_filter = {
        category: { $in: category_query_arr },
      };
    }
    let skill_filter = {};
    if (skill_query !== '' && skill_query !== '[]') {
      const skill_query_arr = JSON.parse(skill_query);
      skill_filter = {
        skills: { $in: skill_query_arr },
      };
    }
    const tasks = await Task.aggregate([
      {
        $match: {
          $and: [
            skill_filter,
            category_filter,
            search_filter,
            { $or: [{ state: null }, { state: TASK_PENDING }] },
          ],
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user',
          foreignField: 'user',
          as: 'userdetails',
        },
      },
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'task',
          as: 'proposals',
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $skip: segment_size * segment_number,
      },
      {
        $limit: segment_size,
      },
      {
        $project: {
          headline: 1,
          category: 1,
          taskpoints: 1,
          date: 1,
          skills: 1,
          userdetails: { first_name: 1, second_name: 1, location: 1 },
          totalApplicants: { $size: '$proposals' },
          createdAt: 1,
        },
      },
    ]);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    new UserActivity({
      activity: `User ran into a problem while searching task`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/fetch
// @desc    Get single task using ID
// @access  Public

router.get('/fetch', auth, async (req, res) => {
  try {
    const task_id = req.query.id || '';
    if (task_id === '') {
      throw { msg: 'no id provided' };
    }
    const taskData = await Task.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { _id: mongoose.Types.ObjectId(task_id) },
                { $or: [{ state: null }, { state: TASK_PENDING }] },
              ],
            },
            {
              $and: [
                { _id: mongoose.Types.ObjectId(task_id) },
                { user: mongoose.Types.ObjectId(req.user.id) },
              ],
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user',
          foreignField: 'user',
          as: 'userdetails',
        },
      },
      {
        $lookup: {
          from: 'works',
          localField: '_id',
          foreignField: 'task',
          as: 'workdetails',
        },
      },
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'task',
          as: 'proposals',
        },
      },
      { $addFields: { totalApplicants: { $size: '$proposals' } } },
      { $project: { proposals: 0 } },
    ]);
    res.json({ taskData });
  } catch (err) {
    console.error(err.message);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while fetching task`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/fetchPublic
// @desc    Get single task using ID
// @access  Public         // login to see tasks

router.get('/fetchPublic', async (req, res) => {
  try {
    const task_id = req.query.id || '';
    if (task_id === '') {
      throw { msg: 'no id provided' };
    }
    const taskData = await Task.aggregate([
      {
        $match: {
          $and: [
            { _id: mongoose.Types.ObjectId(task_id) },
            { $or: [{ state: null }, { state: TASK_PENDING }] },
          ],
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user',
          foreignField: 'user',
          as: 'userdetails',
        },
      },
    ]);
    res.json({ taskData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/proposals_pending
// @desc    Get task for editing
// @access  Private

router.get('/proposals_pending', auth, async (req, res) => {
  try {
    const proposalData = await Proposal.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { task_id: '$task' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$state', TASK_PENDING] },
                    { $eq: ['$_id', '$$task_id'] },
                  ],
                },
              },
            },
          ],
          as: 'applied_tasks',
        },
      },
      {
        $project: {
          applied_tasks: {
            _id: 1,
          },
        },
      },
    ]);
    res.json({ proposalData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/edit
// @desc    Get task for editing
// @access  Private

router.get('/edit', auth, async (req, res) => {
  try {
    const task_id = req.query.id || '';
    if (task_id === '') {
      throw { msg: 'no id provided' };
    }

    const taskData = await Task.aggregate([
      {
        $match: {
          $and: [
            { _id: mongoose.Types.ObjectId(task_id) },
            { user: mongoose.Types.ObjectId(req.user.id) },
            { state: { $ne: TASK_COMPLETED } },
            { state: { $ne: TASK_ASSIGNED } },
            { state: { $ne: TASK_ARCHIVED } },
          ],
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user',
          foreignField: 'user',
          as: 'userdetails',
        },
      },
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'task',
          as: 'proposals',
        },
      },
      { $addFields: { totalApplicants: { $size: '$proposals' } } },
      { $project: { proposals: 0 } },
    ]);
    res.json({ taskData });
  } catch (err) {
    console.error(err.message);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while getting edit data of a task`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks/editstatus
// @desc    Change task status
// @access  Private

router.post('/editstatus', auth, async (req, res) => {
  try {
    const task_id = req.body.task_id || '';
    if (task_id === '') {
      throw { msg: 'no id provided' };
    }
    const taskData = await Task.findOne({
      $and: [
        { _id: mongoose.Types.ObjectId(task_id) },
        { user: mongoose.Types.ObjectId(req.user.id) },
        { state: { $ne: TASK_COMPLETED } },
        { state: { $ne: TASK_ASSIGNED } },
        { state: { $ne: TASK_ARCHIVED } },
      ],
    });

    if (!taskData) {
      return res.status(500).send(`You can't update this task.`);
    }

    taskData.state = req.body.new_status;

    await taskData.save();

    if (parseInt(req.body.new_status) === TASK_ARCHIVED) {
      const profile = await PersonalDetails.findOne({
        user: taskData.user,
      });

      profile.pointsEarned =
        parseInt(profile.pointsEarned) + parseInt(taskData.taskpoints);

      profile.tasksCanceled = parseInt(profile.tasksCanceled) + 1;

      await profile.save();

      addNotification(
        `Your task '${taskData.headline}' has been removed. ${taskData.taskpoints} points have been refunded to your account.`,
        taskData.user,
        `/t/${taskData._id}`
      );
    }

    new UserActivity({
      user_id: req.user.id,
      activity: `User changed status of the task ${taskData.headline}`,
      payload: JSON.stringify(req.body),
    }).save();

    res.json({ taskData: taskData[0] });
  } catch (err) {
    console.error(err.message);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while getting status.`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks/edit
// @desc    Update task content
// @access  Private

router.post('/edit', auth, async (req, res) => {
  try {
    const task_id = req.body.task_id || '';
    if (task_id === '') {
      throw { msg: 'no id provided' };
    }
    const taskData = await Task.findOne({
      $and: [
        { _id: mongoose.Types.ObjectId(task_id) },
        { user: mongoose.Types.ObjectId(req.user.id) },
        { state: { $ne: TASK_COMPLETED } },
        { state: { $ne: TASK_ASSIGNED } },
        { state: { $ne: TASK_ARCHIVED } },
      ],
    });

    if (!taskData) {
      return res.status(500).send(`You can't update this task.`);
    }

    taskData.description = req.body.description;
    taskData.skills = req.body.skills;
    taskData.category = req.body.category;
    taskData.duration = req.body.duration;

    await taskData.save();
    res.json({ taskData: taskData[0] });
    new UserActivity({
      user_id: req.user.id,
      activity: `User edited a task ${taskData.headline}`,
      payload: JSON.stringify(req.body),
    }).save();
  } catch (err) {
    console.error(err.message);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while editing a task`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tasks/:task_id
// @desc    Delete task
// @access  Private
router.delete('/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authourized' });
    }

    await Task.findOneAndRemove({ _id: req.params.task_id });

    res.json({ msg: 'Task deleted' });
    new UserActivity({
      user_id: req.user.id,
      activity: `User just deleted the task.`,
      payload: JSON.stringify(err.message),
    }).save();
  } catch (err) {
    console.error(err.message);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while deleting a task`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});
// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public         // login to see tasks

router.get('/:limit_tasks/:skip_tasks', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit_tasks) || 0;
    const skip = parseInt(req.params.skip_tasks) || 0;
    const tasks = await Task.find().sort({ date: -1 }).limit(limit).skip(skip); // toget recents one
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get all tasks count
// @access  Public         // login to see tasks

router.get('/taskscount', async (req, res) => {
  try {
    const tasks = await Task.count(); // toget recents one
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/all/:user_id/:skip/:limit
// @desc    get all tasks of some specific user. Skip and Limit are for pagination.
// @access  Public
router.get('/all/:user_id/:skip_tasks/:limit_tasks', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit_tasks) || 0;
    const skip = parseInt(req.params.skip_tasks) || 0;

    const uTask = await Task.find({
      user_id: req.params.user_id,
    })
      .limit(limit)
      .skip(skip);

    if (!uTask) {
      return res.status(200).json({ msg: 'No tasks found' });
    }
    res.json(uTask);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Could not find tasks for this user.' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tasks/like/:id
// @desc    Like task
// @access  Private         // login to see tasks

router.put('/like/:task_id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);
    // check for already liked
    if (
      task.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      //Get remove index

      const removeIndex = task.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      task.likes.splice(removeIndex, 1);
      await task.save();

      res.json(task.likes);

      // return res.status(400).json({ msg: 'task already liked' });
    } else {
      task.likes.unshift({ user: req.user.id });
      await task.save();

      res.json(task.likes);
    }

    //res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   POST api/tasks/proposal/:task_id
// @desc    Proposal on a task
// @access  Private
router.post(
  '/proposal/:task_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select('-password');
      const task = await Task.findById(req.params.task_id);

      const newProposal = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      task.proposals.unshift(newProposal);

      await task.save();

      res.json(task.proposals);
    } catch (err) {
      console.error(err.message);
      new UserActivity({
        user_id: req.user.id,
        activity: `User ran into a problem while sending a proposal`,
        payload: JSON.stringify(err.message),
      }).save();
      res.status(500).send('Server Error .');
    }
  }
);

// @route   DELETE api/tasks/proposal/:task_id/:proposal_id
// @desc    Delete Proposal
// @access  Private

router.delete('/proposal/:task_id/:proposal_id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);

    // Pull out proposal

    const proposal = task.proposals.find(
      (proposal) => proposal.id === req.params.proposal_id // what about string compare?
    );

    // make sure proposal exists

    //return res.json(task.proposals);

    if (!proposal) {
      return res.status(404).json({ msg: 'proposal does not exist' });
    }

    // check for same user who had proposal written

    if (proposal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authourized' });
    }

    //Get remove index

    const removeIndex = task.proposals
      .map((proposal) => proposal.id.toString())
      .indexOf(req.params.proposal_id);

    task.proposals.splice(removeIndex, 1);
    await task.save();

    res.json(task.proposals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/tasks/sendproposal
// @desc Send new Task
// @access Private

router.post('/sendproposal', auth, async (req, res) => {
  try {
    const ptask = await Task.findOne({
      $and: [
        { _id: mongoose.Types.ObjectId(req.body.task_id) },
        { state: TASK_PENDING },
      ],
    });
    if (!ptask) {
      return res.status(500).send(`You can't update this task.`);
    }
    const oldProposal = await Proposal.find({
      task: mongoose.Types.ObjectId(req.body.task_id),
      user: mongoose.Types.ObjectId(req.user.id),
    });
    if (oldProposal.length) {
      console.log(oldProposal);
      return res.json({ msg: 'You have already applied to this task.' });
    }

    const newProposal = new Proposal({
      task: req.body.task_id,
      text: req.body.text,
      user: req.user.id,
    });

    if (ptask.user.toString() === req.user.id.toString()) {
      return res
        .status(500)
        .json({ message: 'you cannot apply to your own task.' });
    }

    const prop = await newProposal.save();
    let conv = await Conversation.findOne({
      $or: [
        {
          user1: req.user.id,
          user2: ptask.user,
        },
        {
          user1: ptask.user,
          user2: req.user.id,
        },
      ],
    });
    if (!conv) {
      const newConversation = new Conversation({
        user1: req.user.id,
        user2: ptask.user,
      });
      conv = await newConversation.save();
    }
    const payload = {
      task_id: req.body.task_id,
      proposal_id: prop.id,

      //need to store this beforehand because user can update it in future.
      task_headline: ptask.headline,
      task_points: ptask.taskpoints,
    };
    const newMsg = new Message({
      conversation_id: conv._id,
      sender: req.user.id,
      text: req.body.text,
      content_type: MESSAGETYPE_PROPOSAL,
      content_payload: JSON.stringify(payload),
    });
    const completed = await newMsg.save();

    let prof = await PersonalDetails.findOne({
      user: req.user.id,
    });

    addNotification(
      `You received a proposal from ${prof.first_name} ${prof.second_name} for your task '${ptask.headline}'.`,
      ptask.user,
      `/t/${ptask._id}`
    );
    res.json(prop);

    //SAVE USER ACTIVITY
    new UserActivity({
      user_id: req.user.id,
      activity: `User sent a new proposal`,
      payload: JSON.stringify(req.body),
    }).save();

    //SENDING EMAIL NOTIFICATION:
    const task_owner_user = await User.findById(ptask.user);
    const task_owner_prof = await PersonalDetails.findOne({ user: ptask.user });
    sendEmailUsingNode(
      'New Proposal',
      task_owner_user.email,
      `You received a proposal from ${prof.first_name} ${prof.second_name} for your task '${ptask.headline}'.`,
      task_owner_prof.first_name,
      task_owner_prof.second_name
    );
  } catch (err) {
    console.error(err);
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while sending a proposal`,
      payload: JSON.stringify(err.message),
    }).save();
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/proposals
// @desc    Get all proposals of task
// @access  Private

router.get('/proposals/', async (req, res) => {
  try {
    const task_id = req.query.id || '';
    if (task_id === '') {
      throw { msg: 'no id provided' };
    }
    const proposal_data = await Proposal.aggregate([
      {
        $match: { task: mongoose.Types.ObjectId(task_id) },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user',
          foreignField: 'user',
          as: 'userdetails',
        },
      },
    ]);
    res.json({ proposal_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks/proposal_state
// @desc    Change proposal state. Accept or Reject.
// @access  Private

router.post(
  '/proposal_state',
  [auth, [check('new_state', 'You must send new state.').not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const pros = await Proposal.findById(req.body.proposal_id);
      pros.status = req.body.new_state;

      const pTask = await Task.findById(pros.task);

      if (pros.status === PROPOSAL_ACCEPTED) {
        //once proposal is accepted:

        pTask.state = TASK_ASSIGNED;
        await pTask.save();

        const newWork = new Work({
          assignedTo: pros.user,
          task: pros.task,
          assignee: req.user.id,
        });

        const tempWork = await newWork.save();

        addNotification(
          `Congrats, your proposal for the task '${pTask.headline}' has been accepted. Start working now!`,
          pros.user,
          `/w/${tempWork._id}`
        );
        addNotification(
          `Work for the task '${pTask.headline}' is on its way.`,
          req.user.id,
          `/w/${tempWork._id}`
        );

        //SENDING EMAIL NOTIFICATION:
        const task_receiver_user = await User.findById(pros.user);
        const task_receiver_prof = await PersonalDetails.findOne({
          user: pros.user,
        });
        sendEmailUsingNode(
          'Proposal Accepted',
          task_receiver_user.email,
          `Congrats, your proposal for the task '${pTask.headline}' has been accepted. Start working now!`,
          task_receiver_prof.first_name,
          task_receiver_prof.second_name
        );
      }

      if (pros.status === PROPOSAL_REJECTED) {
        addNotification(
          `Your proposal for the task '${pTask.headline}' was rejected by the task owner.`,
          pros.user,
          `/t/${pTask._id}`
        );
      }

      await pros.save();
      res.json(pros);

      new UserActivity({
        user_id: req.user.id,
        activity: `User responded with changed proposal status`,
        payload: JSON.stringify(req.body),
      }).save();
    } catch (err) {
      console.error(err.message);
      new UserActivity({
        user_id: req.user.id,
        activity: `User ran into a problem while changing state of proposal task`,
        payload: JSON.stringify(err.message),
      }).save();
      res.status(500).send('Server Error .');
    }
  }
);

// @route   GET api/tasks/published
// @desc    Get all published tasks by the user
// @access  Private

router.get('/published/', [auth], async (req, res) => {
  try {
    const limit = parseInt(req.query.lim) || -1;
    const tasks_data = await Task.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(req.user.id) },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $limit: limit,
      },
    ]);
    res.json({ tasks_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/myavailable/', [auth], async (req, res) => {
  try {
    const state = parseInt(req.query.state);
    const tasks_data = await Task.aggregate([
      {
        $match: {
          $and: [
            { user: mongoose.Types.ObjectId(req.user.id) },
            { $or: [{ state: null }, { state: state }] },
          ],
        },
      },
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'task',
          as: 'proposals',
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    res.json({ tasks_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/mytasks/', [auth], async (req, res) => {
  try {
    const state = parseInt(req.query.state);
    const tasks_data = await Task.aggregate([
      {
        $match: {
          $and: [
            { user: mongoose.Types.ObjectId(req.user.id) },
            { state: state },
          ],
        },
      },
      {
        $lookup: {
          from: 'proposals',
          localField: '_id',
          foreignField: 'task',
          as: 'proposals',
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    res.json({ tasks_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/completed_tasks', [auth], async (req, res) => {
  try {
    const work_data = await Work.aggregate([
      {
        $match: {
          $and: [
            {
              assignee: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { task_id: '$task' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$state', TASK_COMPLETED] },
                    { $eq: ['$_id', '$$task_id'] },
                  ],
                },
              },
            },
          ],
          as: 'taskDetails',
        },
      },
    ]);
    res.json({ work_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/assigned_tasks', [auth], async (req, res) => {
  try {
    const work_data = await Work.aggregate([
      {
        $match: {
          $and: [
            {
              assignee: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { task_id: '$task' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$state', TASK_ASSIGNED] },
                    { $eq: ['$_id', '$$task_id'] },
                  ],
                },
              },
            },
          ],
          as: 'taskDetails',
        },
      },
    ]);
    res.json({ work_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/working
// @desc    Get all tasks the user is working on
// @access  Private

router.get('/working/', [auth], async (req, res) => {
  try {
    const limit = parseInt(req.query.lim) || -1;
    const work_data = await Work.aggregate([
      {
        $match: { assignedTo: mongoose.Types.ObjectId(req.user.id) },
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
        $sort: { updatedAt: -1 },
      },
      {
        $limit: limit,
      },
    ]);
    res.json({ work_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/currentlyworking/', [auth], async (req, res) => {
  try {
    const work_data = await Work.aggregate([
      {
        $match: {
          $and: [
            {
              assignedTo: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { task_id: '$task' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$state', TASK_ASSIGNED] },
                    { $eq: ['$_id', '$$task_id'] },
                  ],
                },
              },
            },
          ],
          as: 'taskDetails',
        },
      },
    ]);
    res.json({ work_data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/completedworking/', [auth], async (req, res) => {
  try {
    const work_data = await Work.aggregate([
      {
        $match: {
          $and: [
            {
              assignedTo: mongoose.Types.ObjectId(req.user.id),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { task_id: '$task' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$state', TASK_COMPLETED] },
                    { $eq: ['$_id', '$$task_id'] },
                  ],
                },
              },
            },
          ],
          as: 'taskDetails',
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
