var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $location, $cookies){

  $scope.message = 'Check out the home controller!';

  $http.defaults.headers.common.Authorization = $cookies.get('token');

  var all = $cookies.getAll();

  console.log(all);

  var logged_in = false;

  $scope.go = function(route){
    $location.path(route);
  }


  // console.log('this would be displaying so many awesome photos');
  // http request to get feed
  $http({
    method: 'get',
    url: '/photos/all'
  }).then(function(res){
    $scope.photos = res.data;
    // console.log(res);
  }, function(err){
    console.log(err);
  })




});
