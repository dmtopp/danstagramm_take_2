var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('loginController', function($scope, $http, $location, $cookies){

  $scope.message = 'Check out the login controller';

  var all = $cookies.getAll();

  // console.log(all);

  $scope.go = function(route){
    $location.path(route);
  }

  $scope.submit = function(){
    var data = {
      username: $scope.username,
      password: $scope.password,
    }

    $scope.password = '';

    if (!data.username || !data.password){
      $scope.message = "please fill out all fields.  thxxxxx";
    } else{

      $scope.username = '';

      $http({
        method: 'post',
        url: '/login',
        data: data
      }).then(function(res){
        console.log(res.data);
        if (res.data){
          $cookies.put('loggedIn', true);
          $cookies.put('username', data.username);
          $scope.go('/');
        } else{
          $scope.message = "incorrect password plz try agin";
        }

      }, function(err){
        console.log(err);
      })

    }

  }
});
