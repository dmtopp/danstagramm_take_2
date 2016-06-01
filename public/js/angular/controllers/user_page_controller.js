var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('userPageController', function($scope, $http, $state, $cookies, $stateParams) {
  $http.defaults.headers.common.Authorization = $cookies.get('token');

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  } else {
    // http request to get users's photos
    $http({
      method: 'get',
      url: '/photos/' + $stateParams.uploader_id
    }).then(function(res){
      console.log(res.data);
      $scope.photos = res.data.photos;

      var userId = $cookies.get('userId');

      // check to see if the user's id is stored in the array of likes from the db
      $scope.photos.forEach(function(photo) {
        if (photo.likes.indexOf(userId) >= 0) {
          photo.liked = true;
          photo.heart = '♥';
        } else {
          photo.liked = false;
          photo.heart = '♡';
        }
      })
    }, function(err) {
      console.log(err);
    });
  }

});
