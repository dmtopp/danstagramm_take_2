var App = App || angular.module('App', ['wu.masonry', 'ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('aboutController', function($scope, $http, $state, $cookies) {

  $scope.about = "Hello and welcome to Danstagramm!  Have a wonderful day!";


});
