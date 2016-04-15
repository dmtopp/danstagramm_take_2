// set up the router
var express    = require('express'),
    App = express.Router(),
    path = require('path');

// set up sessions
// App.use(express.cookieParser());
// App.use(express.session({ secret: 'supersecret' }));


// set up routes!
// This route serves our layout
// The rest of our views are served via angular in public/js/ang_core
App.route('/')
  .get(function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/layout.html'));
  })

App.route('/login')
  .post(function(req, res, next){
    // log the user in
  })

App.route('/signup')
  .post(function(req, res, next){
    // save a new login in the database and log the user in
  })

App.route('/upload')
  .post(function(req, res, next){
    console.log('The /upload route has recieved a post request!');
    // save req.body.file in the database
    res.send("hey thanks!");
  })

App.route('/photos')
  .get(function(req, res, next){
    // send back a particular photo or all photos in the user's feed
  })
module.exports = App;
