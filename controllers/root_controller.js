// require dependencies
// --------------------
var express    = require('express'),
    App        = express.Router(),
    path       = require('path'),
    bcrypt     = require('bcryptjs'),
    mongoose   = require('mongoose'),
    jwt        = require('jsonwebtoken');


// grab our models for the db
var Photo = require('../models/Photo');
var User  = require('../models/User');


/* Set up routes!
 * This route serves our layout
 * The rest of our views are served via angular in public/js/ang_core */
App.route('/')
  .get(function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/layout.html'));
  })

App.route('/upload')
  .post(function(req, res, next){
    console.log('The /upload route has recieved a post request!');
    // save req.body.file in the database
    Photo.create(req.body, function(err, Photo){
      if (err) console.log(err);
      else res.send("hey thanks, you did it!");
    })
    // console.log(req.body);
  })

App.route('/photos')
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

module.exports = App;
