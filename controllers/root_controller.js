// require dependencies
// --------------------
var express    = require('express'),
    RootController        = express.Router(),
    path       = require('path'),
    bcrypt     = require('bcryptjs'),
    mongoose   = require('mongoose'),
    jwt        = require('jsonwebtoken'),
    User       = require('../models/User'),
    Photo      = require('../models/Photo');

/* Set up routes!
 * This route serves our layout
 * The rest of our views are served via angular in public/js/ang_core */
RootController.route('/')
  .get(function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/layout.html'));
  })


module.exports = RootController;
