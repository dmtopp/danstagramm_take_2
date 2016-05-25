var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.controller('uploadController', function($scope, Upload, $state, $http, $cookies){
  // var all = $cookies.getAll();
  // console.log(all);

  console.log($cookies.get('loggedIn'));

  if (!$cookies.get('loggedIn')) {
    $state.go('parent.login-signup');
  }

  // submit function triggers on button click
  $scope.submit = function() {
    if ($scope.form.file.$valid && $scope.file) {
      $scope.upload($scope.file);
    } else {
      $scope.changeMessage("Please select a picture first!");
    }
  };

  // take our file and send it to the server
  $scope.upload = function (file) {
    // dataUrl converts the image to base64 first
    Upload.dataUrl(file, true)
      .then(function(base64){
        $http({
          method: 'post',
          url: '/photos/upload',
          data: { file: base64,
                  uploader: $cookies.get('username'),
                  uploader_id: $cookies.get('userId'),
                  caption: $scope.caption,
                  likes: 0,
                  comments: [{ comment: "Great!", owner: "Dan", owner_id: "1" }]
                }
        }).then(function(res){
          $scope.changeMessage("Upload successful!");
          $state.go('parent.home');
        }, function(err){
          $scope.changeMessage("There was an error!  Please try again.");
          console.log('oh no!');
          console.log(err);
        })

      })

    };


});
