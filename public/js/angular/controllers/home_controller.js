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
        photo.commentQty = 0;
        photo.expanded = false;
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
      self.photo.likes = res.data.likes;
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

  $scope.showComments = function() {
    this.photo.commentQty = this.photo.comments.length;
    this.photo.expanded = true;
  }

  $scope.hideComments = function() {
    this.photo.commentQty = 0;
    this.photo.expanded = false;
  }

  $scope.commentSubmit = function() {
    var userId = $cookies.get('userId');
    var username = $cookies.get('username');
    var self = this;

    $http({
      method: 'post',
      url: '/photos/comment',
      data: { photoId: self.photo._id,
              userId: userId,
              username: username,
              comment: self.photo.comment }
    }).then(function(res){
      self.photo.comments = res.data.comments;
      if (self.photo.expanded) {
        self.photo.commentQty = self.photo.comments.length;
      } else {
        self.photo.commentQty = 0;
      }
    }, function(err) {
      $scope.changeMessage("There was an error!  Please try again.");
      console.log(err);
    });



    this.photo.comment = '';
  }
});
