var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('logoutController', function($scope, $http, $state, $cookies) {


  $cookies.remove('token');
  $cookies.remove('loggedIn');
  $cookies.remove('username');

  $scope.changeLogin();

  $state.go('parent.login-signup');

  $scope.message = "You are now logged out.  See ya around!";
})
