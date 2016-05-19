var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $state, $cookies){

  console.log($scope.$parent);

  $scope.message = 'Check out the home controller!';

  $http.defaults.headers.common.Authorization = $cookies.get('token');

  if (!$cookies.get('loggedIn')) {
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
  })




});
