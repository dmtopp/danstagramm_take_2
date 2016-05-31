// require dependencies
// --------------------
var express         = require('express'),
    PhotoController = express.Router(),
    path            = require('path'),
    bcrypt          = require('bcryptjs'),
    mongoose        = require('mongoose'),
    jwt             = require('jsonwebtoken'),
    User            = require('../models/User'),
    Photo           = require('../models/Photo');

PhotoController.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.send('No token!');
  }
})

PhotoController.route('/upload')
  .post(function(req, res, next){
    // console.log('The /upload route has recieved a post request!');
    // save req.body.file in the database
    Photo.create(req.body, function(err, Photo){
      if (err) console.log(err);
      else res.send("hey thanks, you did it!");
    })
    // console.log(req.body);
  })

PhotoController.route('/all')
  .get(function(req, res, next) {

    Photo.find(function(err, photos){
      if (err) console.log(err);
      else {
        var photoData = photos.map(function(photo){
          return { file: photo.file,
                   _id: photo._id,
                   uploader: photo.uploader,
                   uploaderId: photo.uploader_id,
                   caption: photo.caption,
                   likes: photo.likes,
                   comments: photo.comments }
        })
        res.send({ photos: photoData,
                   success: true });
      }
    })
    // send back a particular photo or all photos in the user's feed
  })

PhotoController.route('/like')
  .post(function(req, res, next) {
    Photo.findById(req.body.photoId, function(err, photo) {
      var userIndex = photo.likes.indexOf(req.body.userId);
      if (userIndex >= 0) {
        photo.likes.splice(userIndex, 1);
        photo.save(function(err, photo) {
          if (err) console.log(err);
          else res.send(photo);
        })
      } else {
        photo.likes.push(req.body.userId);
        photo.save(function(err, photo) {
          if (err) console.log(err);
          else res.send(photo);
        });
      }
    });
  });


module.exports = PhotoController;
