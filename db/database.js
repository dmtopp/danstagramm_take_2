var mongoose = require('mongoose');

var connectionString = process.env.DB;

console.log('Attempting to connect to the danstagramm database...');
console.log('====================================================');

mongoose.connect(connectionString);

mongoose.connection.on('connected', function(){
  console.log('Connected to danstagramm database.');
  console.log('====================================================');
});

mongoose.connection.on('error', function(err){
  console.log('Oh no! An error occured!');
  console.log(err);
  console.log('====================================================');
});

mongoose.connection.on('disconnected', function(){
  console.log('Disconnected from danstagramm database.');
  console.log('====================================================');
});
