var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('parentController', function($scope, $state) {
  $state.go('parent.home');

  $scope.lol = false;
  $scope.lolol = true;
  $scope.loggedIn = false;

  $scope.changeLogin = function() {
    $scope.loggedIn = !$scope.loggedIn;
  }


})
