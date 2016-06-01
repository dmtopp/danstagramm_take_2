var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('userPageController', function($scope, $http, $state, $cookies, $stateParams) {
  $scope.changeMessage($stateParams);
  console.log($stateParams);
});
