var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('loginController', function($scope, $http, $state, $cookies){

  $scope.message = 'Pls login to use all the sweet Danstagramm features';

  var all = $cookies.getAll();
  // console.log(all);

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

  }
});
