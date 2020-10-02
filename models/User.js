const mongoose = require('mongoose');

const User = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: {type: String, require:true },
  role: {type: String, require:true, default: 'editor' },
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', User);
