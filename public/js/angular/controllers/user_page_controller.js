var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('userPageController', function($scope, $http, $state, $cookies, $stateParams, $controller) {
  $http.defaults.headers.common.Authorization = $cookies.get('token');

  $controller('homeController', { $scope: $scope });

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  } else {
    $scope.getPhotos($stateParams.uploader_id);
  }


});
