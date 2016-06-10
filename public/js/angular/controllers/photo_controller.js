var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('photoController', function($scope, $http, $state, $cookies, $stateParams, photoService) {
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
