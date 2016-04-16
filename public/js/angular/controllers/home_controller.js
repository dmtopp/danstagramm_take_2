var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $location, $cookies){

  $scope.message = 'Check out the home controller!';

  var all = $cookies.getAll();

  // console.log(all);

  var logged_in = false;

  $scope.go = function(route){
    $location.path(route);
  }

  $http({
    method: 'get',
    url: '/logged_in'
  }).then(function(res){
    console.log(res.data);
    logged_in = res.data; //true or false

    if (!logged_in) {
      $scope.go('/login');
    } else{

      console.log('this would be displaying so many awesome photos');
      // http request to get feed


      // $http({
      //   method: 'get',
      //   url: '/photos'
      // }).then(function(res){
      //   console.log(res);
      // }, function(err){
      //   console.log(err);
      // })

    }



  }, function(err){
    console.log(err);
  })



});
