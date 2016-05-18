// require dependencies
// --------------------
require('dotenv').config();
var express    = require('express'),
    bodyParser = require('body-parser'),
    exphbs     = require('express-handlebars'),
    // jwt        = require('jsonwebtoken'),
    app        = express();

// require the database
// --------------------
require('./db/database.js');

// set views and public folders here
// ---------------------------------
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
// app.engine('hbs', exphbs({
//   defaultLayout: 'index',
//   extname: 'hbs'
// }));
// app.set('view engine', 'hbs');



// config stuff for bodyParser
// ---------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// map controllers here
// --------------------
// app.get('/', function(req, res, next){
//   res.sendFile(__dirname + '/views/index.html');
// })

app.use('/', require('./controllers/root_controller'));
app.use('/users', require('./controllers/users_controller'));
app.use('/photos', require('./controllers/photos_controller'));


// start the server
// ----------------
var server = app.listen(3000, function(){
  console.log('The server is listening on port ' + server.address().port);
})
