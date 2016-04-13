// var path = require('path');
var App = angular.module('App', ['ngRoute']);

App.config(function($routeProvider){
  // console.log(path.join(__dirname, '../views/pages/home.html'));
  $routeProvider
    .when('/?', {
      templateUrl : '/views/pages/home.html',
      controller  : 'homeController'
    })
    .when('/login', {
      templateUrl : '/views/pages/login.html',
      controller  : 'loginController'
    });
})

App.controller('homeController', function($scope){
  // console.log(path.join(__dirname, '../views/pages/home.html'));
  $scope.message = 'Check out the home controller!';

});

App.controller('loginController', function($scope){
  $scope.message = 'Check out the login controller';
});

console.log('hey we did it!');
