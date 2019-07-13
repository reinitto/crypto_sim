var express = require('express');
var router = express.Router();
let week = 864000;
let weeks = 290;
let initialTime = 1279324800;
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

const checkIfValid = (username, password) => {
  if (users[username]) {
    console.log('is valid');
    return true;
  }
  return false;
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
router.post('/loadUser', function(req, res, next) {
  let isValid = checkIfValid(req.body.username, req.body.password);
  if (isValid) {
    let user = { ...users[req.body.username] };
    res.json({ user });
  } else {
    res.json({ error: 'invalid username or password' });
  }
});

module.exports = router;
