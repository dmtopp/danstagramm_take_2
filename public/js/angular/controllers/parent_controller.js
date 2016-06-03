var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('parentController', function($scope, $state, $cookies) {
  $state.go('parent.about');

  $scope.loggedIn = $cookies.get('loggedIn');
  $scope.parentMessage = '';

  $scope.changeLogin = function() {
    $scope.loggedIn = !$scope.loggedIn;
  };

  $scope.changeMessage = function(message) {
    $scope.parentMessage = message;
  };


});
