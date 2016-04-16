var App = App || angular.module('App', ['ngRoute', 'ngFileUpload']);

App.controller('loginController', function($scope, $http, $location){

  $scope.message = 'Check out the login controller';

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
        $scope.go('/');
      }, function(err){
        console.log(err);
      })

    }

  }
});
