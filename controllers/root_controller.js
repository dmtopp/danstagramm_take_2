// set up the router
var express    = require('express'),
    TestController = express.Router(),
    path = require('path');

// set up routes!
TestController.route('/')
  .get(function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/layout.html'));
  })

module.exports = TestController;
