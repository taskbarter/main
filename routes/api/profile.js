const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// bring in user and profile models
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const User = require('../../models/User');
const PersonalDetails = require('../../models/PersonalDetails');

// @route   GET api/profile/me
// @desc    My profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // populate brings in fields from other model
    const profile = await PersonalDetails.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'fname', 'sname']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no Profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

// @route   POST api/profile/me
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required').not().isEmpty(),
      check('skills', 'skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  how objects works?
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    // built profile object

    const profileFields = {}; // empty object?  // runtime object??

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    // after split each element trim (due to map)
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile/
// @desc    get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', [
      'name',
      'fname',
      'sname',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id <= place holder
// @desc    get profile by user_id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await PersonalDetails.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'fname', 'sname']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user, task
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove user tasks

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/update         // for updation of existing profile
// @desc    Add profile experience
// @access  Private

router.post('/update', [auth], async (req, res) => {
  const {
    first_name,
    second_name,
    gender,
    tagline,
    bio,
    dob,
    location,
  } = req.body;

  const profileFields = {}; // empty object?  // runtime object??
  console.log('updating profile...' + req.user.id);
  profileFields.user = req.user.id;
  profileFields.first_name = first_name;
  profileFields.second_name = second_name;
  profileFields.gender = gender;
  profileFields.headline = tagline;
  profileFields.bio = bio;
  profileFields.location = location;
  profileFields.dob = dob;

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    if (profile) {
      // update profile
      profile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/updatestatus        // for updation of existing profile
// @desc    Add profile availability status
// @access  Private

router.post('/updatestatus', [auth], async (req, res) => {
  const { status } = req.body;

  const profileFields = {}; // empty object?  // runtime object??
  console.log('updating profile...' + req.user.id);
  profileFields.user = req.user.id;
  profileFields.status = status;

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    if (profile) {
      // update profile
      profile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience         // for updation of existing
// @desc    Add profile experience
// @access  Private

router.put('/experience', [auth], async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    // it will even have id (perks of nosql document database)
    //rather having saperate relation table and diong keys relation
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    if (profile) {
      profile.experience.unshift(newExp); // push with new at recent (on top)
      let tprofile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: { experience: profile.experience } },
        { new: true }
      );
      console.log(profile.experience);
      res.json(tprofile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/experience/:exp_id', [auth], async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    // it will even have id (perks of nosql document database)
    //rather having saperate relation table and diong keys relation
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    if (profile) {
      profile.experience[req.params.exp_id] = newExp;
      let tprofile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: { experience: profile.experience } },
        { new: true }
      );
      console.log(profile.experience);
      res.json(tprofile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/experience/:epx_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await PersonalDetails.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    // may need check if not found
    profile.experience.splice(removeIndex, 1);
    console.log(removeIndex);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  select and ctrl-d time simul changes

// @route   PUT api/profile/education         // for updation of existing
// @desc    Add profile education
// @access  Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      // it will even have id (perks of nosql document database)
      //rather having saperate relation table and diong keys relation
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu); // push with new at recent (on top)
      profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    console.log(removeIndex);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public

// router.get('/github/:username', (req, res) => {
//   try {
//     const options = {
//       uri: `https://api.github.com/users/${
//         req.params.username
//       }/repos?per_page=5&sort=created:asc&clientId=${config.get(
//         'githubClientId'
//       )}&client_secret=${config.get('githubSecret')}`,
//       method: 'GET',
//       headers: { 'user-agent': 'node.js' }
//     };

//     request(options, (error, response, body) => {
//       if (error) connsole.error(error);

//       if (response.statusCode !== 200) {
//         return res.status(404).json({ msg: 'No profile found' });
//       }
//       res.json(JSON.parse(body));
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   PUT api/profile/experience         // for updation of existing
// @desc    Add profile experience
// @access  Private

router.put('/project', [auth], async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { title, link, location, from, to, current, description } = req.body;

  const newProject = {
    // it will even have id (perks of nosql document database)
    //rather having saperate relation table and diong keys relation
    title,
    link,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    console.log(profile.projects);
    if (profile) {
      profile.projects.unshift(newProject); // push with new at recent (on top)
      let tprofile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: { projects: profile.projects } },
        { new: true }
      );
      console.log(profile.projects);
      res.json(tprofile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/project/:exp_id', [auth], async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { title, link, location, from, to, current, description } = req.body;

  const newProject = {
    // it will even have id (perks of nosql document database)
    //rather having saperate relation table and diong keys relation
    title,
    link,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    console.log(profile.projects);
    if (profile) {
      profile.projects[req.params.exp_id] = newProject;
      let tprofile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: { projects: profile.projects } },
        { new: true }
      );
      console.log(profile.projects);
      res.json(tprofile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/project/:exp_id', auth, async (req, res) => {
  try {
    const profile = await PersonalDetails.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.projects
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    // may need check if not found
    profile.projects.splice(removeIndex, 1);
    console.log(removeIndex);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/skill', [auth], async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { skill } = req.body;

  const newSkill = {
    // it will even have id (perks of nosql document database)
    //rather having saperate relation table and diong keys relation
    skill,
  };

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    console.log(profile.skills);
    if (profile) {
      profile.skills.unshift(newSkill.skill); // push with new at recent (on top)
      let tprofile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: { skills: profile.skills } },
        { new: true }
      );
      console.log(profile.skills);
      res.json(tprofile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/link', [auth], async (req, res) => {
  const { youtube, twitter, facebook, linkedin, instagram } = req.body;

  const links = {}; // empty object?  // runtime object??
  const temLinks = {
    youtube: youtube,
    twitter: twitter,
    facebook: facebook,
    linkedin: linkedin,
    instagram: instagram,
  };
  console.log('updating links...' + req.user.id);
  links.user = req.user.id;
  links.social = temLinks;

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    if (profile) {
      // update profile
      profile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: links },
        { new: true }
      );
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/removeskill', [auth], async (req, res) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { skill_id } = req.body;

  try {
    let profile = await PersonalDetails.findOne({ user: req.user.id });
    if (profile) {
      profile.skills.splice(skill_id, 1);
      let tprofile = await PersonalDetails.findOneAndUpdate(
        { user: req.user.id },
        { $set: { skills: profile.skills } },
        { new: true }
      );
      console.log(profile.skills);
      res.json(tprofile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
