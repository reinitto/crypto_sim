const mongoose = require('mongoose');

const CryptoSchema = mongoose.Schema({
  timestamp: {
    type: Number,
    required: true,
    unique: true
  },
  cryptos: {
    type: [mongoose.Schema.Types.Mixed]
  }
});

// LogSchema.index({
//   message: 'text',
//   tech: 'text'
// });
module.exports = mongoose.model('cryptos', CryptoSchema);
