// require dependencies
// --------------------
require('dotenv').config();
var express    = require('express'),
    bodyParser = require('body-parser'),
    exphbs     = require('express-handlebars'),
    app        = express();

// require the database
// --------------------
require('./db/database.js');

// set views and public folders here
// ---------------------------------
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.set('views', __dirname + '/views');



// config stuff for bodyParser
// ---------------------------
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));


// map controllers here
// --------------------
app.use('/', require('./controllers/root_controller'));
app.use('/users', require('./controllers/users_controller'));
app.use('/photos', require('./controllers/photos_controller'));


// start the server
// ----------------
var server = app.listen(3000, function(){
  console.log('The server is listening on port ' + server.address().port);
})
