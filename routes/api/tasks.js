const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route POST api/tasks/add
// @desc Add new Task
// @access Private

// only those having account must add task to ensure security ?
router.post('/add', auth, (req, res) => {
  if (!req.body.headline) {
    return res
      .status(404)
      .json({ headlineNotFound: 'Headline cannot be empty!' });
  }
  const newTask = new Task({
    headline: req.body.headline,
    description: req.body.description,
    category: req.body.category,
    skills: req.body.skills,
    user: req.user.id, // for secure task adding
    duration: req.body.duration,
    points: req.body.points
  });
  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public         // login to see tasks

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 }); // toget recents one
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
      user_id: req.params.user_id
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

// @route   GET api/tasks/:task_id
// @desc    get single task with the specified ID.
// @access  Public
router.get('/:task_id', async (req, res) => {
  try {
    const required_task = await Task.findById(req.params.task_id);

    if (!required_task) {
      return res.status(400).json({ msg: 'No tasks found' });
    }

    res.json(required_task);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Could not find the specified task' });
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
      task.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      //Get remove index

      const removeIndex = task.likes
        .map(like => like.user.toString())
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
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
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
        user: req.user.id
      };

      task.proposals.unshift(newProposal);

      await task.save();

      res.json(task.proposals);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error .');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete Comment
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id // what about string compare?
    );

    // make sure comment exists

    //return res.json(post.comments);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // check for same user who commented

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authourized' });
    }

    //Get remove index

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
