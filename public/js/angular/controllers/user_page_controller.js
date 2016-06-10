var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('userPageController', function($scope, $http, $state, $cookies, $stateParams, photoService) {
  $http.defaults.headers.common.Authorization = $cookies.get('token');
  $scope.quantity = 15;
  $scope.skip = 0;

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  } else {
    $scope.photos = [];

    photoService.getPhotos($stateParams.uploader_id).then(function(res) {
      if (!res.data.err) {
        var photos = res.data.photos;
        var userId = $cookies.get('userId');

        // check to see if the user's id is stored in the array of likes from the db
        photos.forEach(function(photo) {
          photo.commentQty = 0;
          photo.expanded = false;
          if (photo.likes.indexOf(userId) >= 0){
            photo.liked = true;
            photo.heart = '♥';
          } else{
            photo.liked = false;
            photo.heart = '♡';
          }
          $scope.photos.push(photo);
        })


      } else {
        $state.go("parent.logout", { message: 'Your session has expired! Please log in again.' });
      }
    },
    function(err) {
      $scope.changeMessage("There was an error!  Please try again.");
      reject(err);
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
      $scope.quantity += 15;
      $scope.skip += 30;
      $scope.getPhotos('all/' + $scope.skip);

    }
  }

  $scope.hoverIn = function() {
    this.isActive = true;
  };

  $scope.hoverOut = function() {
    this.isActive = false;
  };

  $scope.highlightPhoto = function() {
    $state.go("parent.photoHighlight", { photo: this.photo });
  }
});
