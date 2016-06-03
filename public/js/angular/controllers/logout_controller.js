var App = App || angular.module('App', ['angularGrid', 'ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('logoutController', function($scope, $http, $state, $cookies, $stateParams) {
  $cookies.remove('token');
  $cookies.remove('loggedIn');
  $cookies.remove('username');

  $scope.changeLogin();
  $scope.changeMessage($stateParams.message);

  $state.go('parent.login-signup');


});
