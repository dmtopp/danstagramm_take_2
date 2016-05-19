var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('signupController', function($scope, $http, $state, $cookies){

  $scope.message = "check out the signup controller!"

  var all = $cookies.getAll();
  // console.log(all);

  console.log($cookies.get('loggedIn'));

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

  }
});
