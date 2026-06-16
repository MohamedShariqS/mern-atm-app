const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  balance: { type: Number, default: 0 },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Account', accountSchema);