var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.controller('uploadController', ['$scope', 'Upload', '$http', '$cookies', function($scope, Upload, $http, $cookies){

  $scope.message = 'Check out the upload controller!';

  var all = $cookies.getAll();

  // console.log(all);

  // submit function triggers on button click
  $scope.submit = function() {
    // I honestly do not know what $scope.form.file.$valid is checking but the
    // guy who wrote this angular module used it so I went ahead and checked it as well.
    // My guess is it has something to do with checking that the file is actually there
    // and/or checking the file type.

    // the rest of this just grabs the file though
    if ($scope.form.file.$valid && $scope.file) {
      $scope.upload($scope.file);
    }
  };

  // take our file and send it to the server
  $scope.upload = function (file) {
    // dataUrl converts the image to base64 first
    Upload.dataUrl(file, true)
      .then(function(base64){
        $http({
          method: 'post',
          url: '/upload',
          data: { file: base64,
                  uploader: "me",
                  uploader_id: "1",
                  caption: "The best photo like ever",
                  likes: 10,
                  comments: [{ comment: "Great!", owner: "Dan", owner_id: "1" }]
                }
        }).then(function(res){
          console.log('Success! ' + res.status + ' ' + res.statusText + ' ' + res.data);
        }, function(err){
          console.log('oh no!');
          console.log(err);
        })

      })

    };


}]);
