var App = App || angular.module('App', ['angularGrid', 'ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('aboutController', function($scope, $http, $state, $cookies) {

  $scope.about = "Hello and welcome to Danstagramm!  Have a wonderful day!";


});
