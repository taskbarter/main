const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// bring in user and profile models
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const User = require('../../models/User');
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const PersonalDetails = require('../../models/PersonalDetails');

// @route POST api/messages/send
// @desc Send new message
// @access Private

//TODO: IMPORTANT! add auth condition in this API.
router.post('/send', auth, (req, res) => {
  const newMessage = new Message({
    conversation: req.body.conversation,
    sender: req.user.id,
    text: req.body.text
  });
  newMessage
    .save()
    .then(msg => res.json(msg))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

// @route POST api/messages/conversation
// @desc Add new conversation
// @access Private

router.post('/conversation', auth, (req, res) => {
  const newConversation = new Conversation({
    user1: req.body.user1,
    user2: req.body.user2
  });
  newConversation
    .save()
    .then(conv => res.json(conv))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

// @route Get api/messages/conversation
// @desc Get all conversations
// @access Private

router.get('/conversations', async (req, res) => {
  try {
    const conv = await Conversation.find({
      $or: [
        {
          user1: req.user.id
        },
        {
          user2: req.user.id
        }
      ]
    });
    if (!conv) {
      return res.status(200).json({ msg: 'No tasks found' });
    }
    res.json(conv);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Could not find conversations for this user.' });
    }
  }
});

// @route Get api/messages/
// @desc Get all messages related to conversation
// @access Private

/*
Query Parameters:
c: Conversation ID
*/
router.get('/', async (req, res) => {
  try {
    const msgs = await Message.find({
      conversation: req.query.c
    });
    if (!msgs) {
      return res.status(200).json([]);
    }
    res.json(msgs);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Could not find messages for this user.' });
    }
  }
});

module.exports = router;
