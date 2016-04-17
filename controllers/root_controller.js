// set up the router
var express    = require('express'),
    session    = require('express-session'),
    App        = express.Router(),
    path       = require('path'),
    bcrypt     = require('bcryptjs'),
    mongoose   = require('mongoose');

// set up sessions
// App.use(express.cookieParser());
App.use(session({ secret: 'supersecret',
                  resave: false,
                  saveUninitialized: false }));
var sess;

// grab our models for the db
var Photo = require('../models/Photo');
var User  = require('../models/User');


// set up routes!
// This route serves our layout
// The rest of our views are served via angular in public/js/ang_core
App.route('/')
  .get(function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/layout.html'));
  })

App.route('/logged_in')
  .get(function(req, res, next){
    console.log(req.session);
    res.send(req.session.loggedIn);
  })

App.route('/login')
  .post(function(req, res, next){
    sess = req.session;
    sess.loggedIn = false;
    var passwordsMatched = true;

    User.findOne({ username: req.body.username }, 'password', function(err, person){
      if (err) console.log(err);
      else {
        // compare password with the one in the database
        bcrypt.compare(req.body.password, person.password, function(err, matched){
          console.log('request pwd: ' + req.body.password);
          console.log('db pwd: ' + person.password);
          // log the user in if they matched
          sess.loggedIn = matched;
          // tell the client if the user successfully logged in
          res.send(sess.loggedIn);
        })

      } // else

    }) // find

  }) // post

App.route('/signup')
  .post(function(req, res, next){

    // object to hold our request data
    var userData = {
      username:        req.body.username,
      password:        req.body.password,
      confirmPassword: req.body.confirmPassword,
      alreadyExist:    false };

    // look in the database to see if there's already a user with that username
    User.findOne({ username: req.body.username }, 'username', function(err, person){
      if (err) console.log(err);
      else {
        // if no results, this will be set to null
        userData.alreadyExist = person;
        // create a new user
        createUser(userData);
      }
    })

    // creates a new user in the database from a userData object
    function createUser(user){
      if (user.password === user.confirmPassword && !user.alreadyExist){
        bcrypt.genSalt(10, function(err,salt){
          bcrypt.hash(user.password, salt, function(err, hash){
            User.create({ username: user.username, password: hash }, function(err, user){
              if (err) console.log(err);
              else console.log("success!" + user);
            })

          })
        })

        res.send('Success! Thanks for signing up!');
      }else if (user.alreadyExist){
        res.send('It looks like that user already exists! Please try a different username.');
      } else{
        res.send('Your passwords didn\'t match! Please try again.');
      }

    };

  })

App.route('/update')
  .post(function(req, res, next){
    console.log(req.body);
    res.send('update response!');
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
