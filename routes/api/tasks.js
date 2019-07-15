const express = require('express');
const router = express.Router();

const Task = require('../../models/Task');

// @route POST api/tasks/add
// @desc Add new Task
// @access Public
router.post('/add', (req, res) => {
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
    user_id: req.body.user_id,
    duration: req.body.duration,
    points: req.body.points
  });
  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => console.log(err));
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

module.exports = router;
