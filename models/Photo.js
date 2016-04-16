// require mongoose ORM
var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  file: String,
  uploader: String,
  uploader_id: String,
  caption: String,
  likes: Number,
  comments: Array
})

module.exports = mongoose.model('Photo', photoSchema);
