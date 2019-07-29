const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const week = 864000;
const weeks = 290;
const initialTime = 1279324800;
time = initialTime + week * weeks;
let users = {
  1: {
    id: 1,
    userName: 'user1',
    money: 100,
    cryptos: [{ name: 'BTC', amount: 300 }],
    timesToInvestLeft: 4,
    time: time
  },
  reinitto: {
    id: 2,
    userName: 'reinitto',
    money: 100000,
    cryptos: [{ name: 'BTC', amount: 30000000 }],
    timesToInvestLeft: 4,
    time: time
  }
};

/* SAVE User. */
router.post('/:id/save', function(req, res, next) {
  users[req.body.username] = req.body;
  res.json({
    success: true,
    message: 'user saved successfully',
    user: users[req.body.username]
  });
});
/* LOAD User. */
router.post(
  '/loadUser',
  [
    check('name', 'Please enter a name')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async function(req, res, next) {
    let isValid = validationResult(req.body.username, req.body.password);
    if (isValid) {
      let user = await User.findOne({ name });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      res.json({ user });
    } else {
      res.json({ error: 'invalid username or password' });
    }
  }
);

// CREATE User
const User = require('../models/User');
// @route       POST user/register
// @desc        Register a user
// @access      Public
router.post(
  '/register',
  [
    check('name', 'Please enter a name')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      let user = await User.findOne({ name });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
        name,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
