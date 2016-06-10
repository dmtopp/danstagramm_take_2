var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('photoHighlightController', function($scope, $http, $state, $cookies, $stateParams, $controller) {
  $http.defaults.headers.common.Authorization = $cookies.get('token');

  $controller('homeController', { $scope: $scope });

  $scope.photo = $stateParams.photo;

  $scope.commentSubmit = function() {
    var userId = $cookies.get('userId');
    var username = $cookies.get('username');
    var self = this;
    console.log(this);

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
  };

  $scope.showComments = function() {
    console.log(this);
    this.photo.commentQty = this.photo.comments.length;
    this.photo.expanded = true;
  }

  $scope.hideComments = function() {
    this.photo.commentQty = 0;
    this.photo.expanded = false;
  }
});
