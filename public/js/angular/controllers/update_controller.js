var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('updateController', function($scope, $http, $location, $cookies){

  $scope.message = 'Check out the update controller!';

  var all = $cookies.getAll();

  // console.log(all);

  $scope.go = function(route){
    $location.path(route);
  }

  $scope.submit = function(){
    var data = {
      username: $scope.username,
      password: $scope.password,
      newPassword: $scope.newPassword,
      confirmNewPassword: $scope.confirmNewPassword
    }

    $scope.password = '';
    $scope.newPassword = '';
    $scope.confirmNewPassword = '';

    if (!data.username || !data.password || !data.newPassword || !data.confirmNewPassword){
      $scope.message = "please fill out all fields.  thxxxxx";
    }
    else if(data.newPassword != data.confirmNewPassword){
      $scope.message = "passwords do not match :(";
    } else{

      $scope.username = '';

      $http({
        method: 'post',
        url: '/update',
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
})
