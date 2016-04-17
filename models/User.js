var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  follwers: { type: Array, required: false },
  follwing: { type: Array, required: false }
})

module.exports = mongoose.model('User', UserSchema);
