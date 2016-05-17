var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $location, $cookies){

  $scope.message = 'Check out the home controller!';

  var all = $cookies.getAll();

  console.log(all);

  var logged_in = false;

  $scope.go = function(route){
    $location.path(route);
  }

  // ask the server if the user is logged in
  $http({
    method: 'get',
    url: '/users/logged_in'
  }).then(function(res){
    $cookies.put('loggedIn', res.data); //res.data will return true or false

    // if not, go to login view
    if ($cookies.get('loggedIn')) {
      $scope.go('/login');
    } else{

      // console.log('this would be displaying so many awesome photos');
      // http request to get feed
      $http({
        method: 'get',
        url: '/photos'
      }).then(function(res){
        $scope.photos = res.data;
        // console.log(res);
      }, function(err){
        console.log(err);
      })

    }



  }, function(err){
    console.log(err);
  })



});
