var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $state, $cookies){
  // set our http request headers to contain our jwt
  $http.defaults.headers.common.Authorization = $cookies.get('token');

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  }

  // console.log('this would be displaying so many awesome photos');
  // http request to get feed
  $http({
    method: 'get',
    url: '/photos/all'
  }).then(function(res){
    $scope.photos = res.data.photos;
  }, function(err){
    console.log(err);
  });

});
