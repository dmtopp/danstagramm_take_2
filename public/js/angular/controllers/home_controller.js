var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http){

  $scope.message = 'Check out the home controller!';


  $http({
    method: 'get',
    url: '/photos'
  }).then(function(res){
    console.log(res);
  }, function(err){
    console.log(err);
  })
});
