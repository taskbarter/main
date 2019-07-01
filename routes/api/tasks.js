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

module.exports = router;
