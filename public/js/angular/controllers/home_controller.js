var App = App || angular.module('App', ['ngRoute', 'ngFileUpload']);

App.controller('homeController', function($scope){

  $scope.message = 'Check out the home controller!';

});
