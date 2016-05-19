var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('loginSignupController', function($scope, $http, $state, $cookies){

  $scope.message = 'Please log in or sign up to use Danstagramm!';

  $scope.loginSubmit = function(){
    var data = {
      username: $scope.loginUsername,
      password: $scope.loginPassword,
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
          $scope.changeLogin();
          $state.go('parent.home');
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
      username: $scope.signupUsername,
      password: $scope.signupPassword,
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
      }, function(err){
        console.log(err);
      })

    }

  } // end signup-submit

});
