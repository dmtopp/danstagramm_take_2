var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $state, $cookies){
  // set our http request headers to contain our jwt
  $http.defaults.headers.common.Authorization = $cookies.get('token');

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  } else {
    // http request to get feed
    $http({
      method: 'get',
      url: '/photos/all'
    }).then(
    function(res){
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
    },
    function(err) {
      console.log(err);
    });
  }




  $scope.likeHandler = function() {
    var userId = $cookies.get('userId');
    var self = this;

    $http({
      method: 'post',
      url: '/photos/like',
      data: { photoId: this.photo._id,
              userId: userId }
    }).then(function(res){
      self.photo = res.data;
      if (self.photo.likes.indexOf(userId) >= 0) {
        self.photo.liked = true;
        self.photo.heart = '♥';
      } else {
        self.photo.liked = false;
        self.photo.heart = '♡';
      }

    }, function(err) {
      console.log(err);
    });
  }

  $scope.getUserPhotos = function() {
    var self = this;

    console.log(self.photo.uploaderId);

    $http({
      method: 'get',
      url: '/photos/' + self.photo.uploaderId
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
