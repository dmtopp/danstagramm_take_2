// require dependencies
// --------------------
var express    = require('express'),
    PhotoController        = express.Router(),
    path       = require('path'),
    bcrypt     = require('bcryptjs'),
    mongoose   = require('mongoose'),
    jwt        = require('jsonwebtoken'),
    User       = require('../models/User'),
    Photo      = require('../models/Photo');

PhotoController.use(function(req, res, next) {
  // console.log(req.body.token);
  // console.log(req.headers['x-access-token']);
  // console.log(req.query.token);
  console.log(req.headers.authorization);
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

  console.log("token? : " + token);

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
    return res.status(403).send('No token!');
  }
})


  .post(function(req, res, next){
    console.log('The /upload route has recieved a post request!');
    // save req.body.file in the database
    Photo.create(req.body, function(err, Photo){
      if (err) console.log(err);
      else res.send("hey thanks, you did it!");
    })
    // console.log(req.body);
  })

PhotoController.route('/all')
  .get(function(req, res, next){

    Photo.find(function(err, photos){
      if (err) console.log(err);
      else {
        var photoData = photos.map(function(photo){
          return photo.file;
        })
        res.send(photoData);
      }
    })
    // send back a particular photo or all photos in the user's feed
  })

module.exports = PhotoController;
