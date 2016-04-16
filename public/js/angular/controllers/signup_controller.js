var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('signupController', function($scope, $http, $location){

  $scope.message = "check out the signup controller!"

  $scope.go = function(route){
    $location.path(route);
  }

  $scope.submit = function(){
    var data = {
      username: $scope.username,
      password: $scope.password,
      confirmPassword: $scope.confirmPassword
    }

    $scope.password = '';
    $scope.confirmPassword = '';

    if (!data.username || !data.password || !data.confirmPassword){
      $scope.message = "please fill out all fields.  thxxxxx";
    }
    else if(data.password != data.confirmPassword){
      $scope.message = "passwords do not match :(";
    } else{

      $scope.username = '';

      $http({
        method: 'post',
        url: '/signup',
        data: data
      }).then(function(res){
        console.log(res.data);
        $scope.message = 'success!';
        // $scope.go('/');
      }, function(err){
        console.log(err);
      })

    }

  }
});
