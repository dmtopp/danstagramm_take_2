var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('homeController', function($scope, $http, $state, $cookies, $controller, photoService) {
  // set our http request headers to contain our jwt
  $http.defaults.headers.common.Authorization = $cookies.get('token');
  $scope.quantity = 15;
  // how many photos to skip over in the database
  $scope.skip = 0;
  $scope.photos = [];

  $controller('photoController', { $scope: $scope });

  if (!$cookies.get('loggedIn')) {
    $scope.changeMessage('Please log in or sign up to use Danstagramm!');
    $state.go('parent.login-signup');
  } else {
    photoService.getPhotos('all').then(function(res) {
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

    // newPhotos.forEach(function(photo) {
    //   $scope.photos.push(photo);
    // });
  }

});
