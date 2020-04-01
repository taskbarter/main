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
    taskpoints: req.body.points
  });
  newTask
    .save()
    .then(task => res.json(task))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
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
    const search_query = req.query.s.toString() || '';
    const skill_filter = toString(req.query.k) || '';
    const industry_filter = toString(req.query.i) || '';
    const location_filter = toString(req.query.l) || '';
    const sort_by = toString(req.query.r) || '';
    const segment_number = parseInt(req.query.c) || 0;
    const segment_size = parseInt(req.query.z) || 6;

    let search_filter = {};
    if (search_query) {
      search_filter = {
        $or: [
          {
            description: new RegExp('\\b' + search_query + '', 'i')
          },
          {
            headline: new RegExp('\\b' + search_query + '', 'i')
          }
        ]
      };
    }
    const tasks = await Task.find(search_filter)
      .sort({ date: -1 })
      .limit(segment_size)
      .skip(segment_size * segment_number); // toget recents one
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
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
  } catch (err) {
    console.error(err.message);
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
    const tasks = await Task.find()
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip); // toget recents one
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

// @route   DELETE api/tasks/proposal/:task_id/:proposal_id
// @desc    Delete Proposal
// @access  Private

router.delete('/proposal/:task_id/:proposal_id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.task_id);

    // Pull out proposal

    const proposal = task.proposals.find(
      proposal => proposal.id === req.params.proposal_id // what about string compare?
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
      .map(proposal => proposal.id.toString())
      .indexOf(req.params.proposal_id);

    task.proposals.splice(removeIndex, 1);
    await task.save();

    res.json(task.proposals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
