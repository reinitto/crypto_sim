const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  money: {
    type: Number,
    default: 10000
  },
  cryptos: {
    type: Array,
    default: []
  },
  timesToInvestLeft: {
    type: Number,
    default: 4
  },
  time: {
    type: Number,
    default: 1529884800
  }
});

module.exports = mongoose.model('user', UserSchema);
