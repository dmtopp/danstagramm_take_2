var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('loginSignupController', function($scope, $http, $state, $cookies){

  $scope.message = 'check out the new/improved login/signupt controller brah';

  $scope.loginSubmit = function(){
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
        url: '/users/login',
        data: data
      }).then(function(res){
        // console.log(res.data);
        if (res.data.success){
          $cookies.put('token', res.data.token);
          $cookies.put('username', data.username);
          $cookies.put('loggedIn', true);
          $scope.go('/');
        } else{
          $scope.message = "incorrect password plz try agin";
        }

      }, function(err){
        console.log(err);
      })

    }

  } // end login-submit


  $scope.signupSubmit = function(){
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
        url: '/users/signup',
        data: data
      }).then(function(res){
        console.log(res.data);
        $scope.message = res.data;
        // $scope.go('/');
      }, function(err){
        console.log(err);
      })

    }

  } // end signup-submit

});
