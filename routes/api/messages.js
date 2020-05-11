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
const UserActivity = require('../../models/UserActivity');
var ObjectId = require('mongodb').ObjectId;

// @route POST api/messages/send
// @desc Send new message
// @access Private

//TODO: IMPORTANT! add auth condition in this API.
router.post('/send', auth, (req, res) => {
  const conv_id = new ObjectId(req.body.conversation);
  const sender_id = new ObjectId(req.body.sender);
  try {
    const newMsg = new Message({
      conversation_id: conv_id,
      sender: sender_id,
      text: req.body.text,
    });
    newMsg
      .save()
      .then((msg) => res.json(msg))
      .catch((err) => {
        console.error(err);
        res.status(500).send('Server Error');
      });
  } catch (e) {
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while sending a message.`,
      payload: JSON.stringify(e.message),
    }).save();
    console.log(e);
  }
});

// @route POST api/messages/conversation
// @desc Add new conversation
// @access Private

router.post('/conversation', auth, (req, res) => {
  const newConversation = new Conversation({
    user1: req.user.id,
    user2: req.body.user2,
  });
  newConversation
    .save()
    .then((conv) => res.json(conv))
    .catch((err) => {
      console.error(err);
      new UserActivity({
        user_id: req.user.id,
        activity: `User ran into a problem while creating a convo`,
        payload: JSON.stringify(err),
      }).save();
      res.status(500).send('Server Error');
    });
});

// @route Get api/messages/conversation
// @desc Get all conversations
// @access Private

router.get('/conversations', async (req, res) => {
  //TODO: Do not get information of current user. It is redundant.

  try {
    const conv = await Conversation.aggregate([
      {
        $match: {
          $or: [
            {
              user1: new ObjectId(req.query.u),
            },
            {
              user2: new ObjectId(req.query.u),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user1',
          foreignField: 'user',
          as: 'user1_details',
        },
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'user2',
          foreignField: 'user',
          as: 'user2_details',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user1',
          foreignField: '_id',
          as: 'user1_username',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user2',
          foreignField: '_id',
          as: 'user2_username',
        },
      },
      {
        $lookup: {
          from: 'messages',
          // localField: '_id',
          // foreignField: 'conversation_id',
          as: 'last_message',
          let: { conv_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$conversation_id', '$$conv_id'] },
              },
            },
            { $sort: { createdAt: -1 } }, // add sort if needed (for example, if you want first 100 comments by creation date)
            { $limit: 1 },
          ],
        },
      },
      { $sort: { 'last_message.createdAt': -1 } },
      {
        $project: {
          user1: 1,
          user2: 1,
          user1_details: {
            first_name: 1,
            second_name: 1,
            memberSince: 1,
            location: 1,
          },
          user2_details: {
            first_name: 1,
            second_name: 1,
            memberSince: 1,
            location: 1,
          },
          user1_username: {
            name: 1,
          },
          user2_username: {
            name: 1,
          },
          last_message: 1,
        },
      },
    ]);
    if (!conv) {
      return res.status(200).json({ msg: 'No conversations found' });
    }
    res.json(conv);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Could not find conversations for this user.' });
    }
    new UserActivity({
      user_id: req.user.id,
      activity: `User ran into a problem while fetching convo list`,
      payload: JSON.stringify(err),
    }).save();
    console.log(err);
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
      conversation_id: req.query.c,
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
