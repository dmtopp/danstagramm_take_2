var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $state, $cookies){

  $scope.message = 'Check out the home controller!';

  $http.defaults.headers.common.Authorization = $cookies.get('token');

  var all = $cookies.getAll();

  // console.log(all);

  console.log($cookies.get('loggedIn'));

  var logged_in = false;


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
