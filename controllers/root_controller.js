// set up the router
var express    = require('express'),
    session    = require('express-session'),
    App        = express.Router(),
    path       = require('path');

// set up sessions
// App.use(express.cookieParser());
App.use(session({ secret: 'supersecret',
                  resave: false,
                  saveUninitialized: false }));
var sess;

// grab our models for the db
var Photo = require('../models/Photo');


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
    // add logic to check password hash
    if (passwordsMatched) sess.loggedIn = true;
    // console.log(sess);
    res.send(sess.loggedIn);
    // log the user in
  })

App.route('/signup')
  .post(function(req, res, next){
    console.log(req.body);
    res.send('sign up response!');
    // save a new login in the database and log the user in
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
        var idees = photos.map(function(photo){
          return photo._id;
        })
        res.send(idees);
      }
    })
    // send back a particular photo or all photos in the user's feed
  })
module.exports = App;
