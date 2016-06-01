var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $state, $cookies) {
  // set our http request headers to contain our jwt
  $http.defaults.headers.common.Authorization = $cookies.get('token');
  $scope.quantity = 10;

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  } else {
    // http request to get feed
    $http({
      method: 'get',
      url: '/photos/all'
    }).then(function(res){
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
      $scope.changeMessage("There was an error!  Please try again.");
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
      $scope.changeMessage("There was an error!  Please try again.");
      console.log(err);
    });
  }

  $scope.showMore = function() {
    if ($scope.quantity >= $scope.photos.length) {
      $scope.changeMessage("There are no more photos to display!");
    } else {
      $scope.quantity += 10;
    }
  }

});
