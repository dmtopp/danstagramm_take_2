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
    console.log(res.data);
    $scope.photos = res.data.photos;


    var userId = $cookies.get('userId');

    // check to see if the user's id is stored in the array of likes from the db
    $scope.photos.forEach(function(photo) {
      if (photo.likes.indexOf(userId)) {
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



  $scope.likeHandler = function() {
    var userId = $cookies.get('userId');
    var self = this;
    console.log(this.photo);

    $http({
      method: 'post',
      url: '/photos/like',
      data: { photoId: this.photo._id,
              userId: userId }
    }).then(function(res){
      console.log(res);
      self.photo = res.data;
      self.photo.liked = true;
      self.photo.heart = '♥';

    }, function(err) {
      console.log(err);
    });
  }
});
