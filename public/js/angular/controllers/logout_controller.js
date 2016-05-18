var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('logoutController', function($scope, $http, $location, $cookies) {

  $scope.go = function(route){
    console.log('go!');
    $location.path(route);
  }

  $cookies.remove('token');
  $scope.go('/');

  $scope.message = "You are now logged out.  See ya around!";
})
