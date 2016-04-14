var App = angular.module('App', ['ngRoute']);

App.config(function($routeProvider){
  // console.log(path.join(__dirname, '../views/pages/home.html'));
  $routeProvider
    .when('/?', {
      templateUrl : '/views/pages/home.html',
      controller  : 'homeController'
    })
    .when('/login', {
      templateUrl : '/views/pages/login.html',
      controller  : 'loginController'
    })
    .when('/upload', {
      templateUrl : '/views/pages/upload.html',
      controller  : 'uploadController'
    })
    .when('/update', {
      templateUrl : '/views/pages/update_account.html',
      controller  : 'updateController'
    });
})

App.controller('homeController', function($scope){
  // console.log(path.join(__dirname, '../views/pages/home.html'));
  $scope.message = 'Check out the home controller!';

});

App.controller('loginController', function($scope){
  $scope.message = 'Check out the login controller';
});

App.controller('uploadController', function($scope){
  $scope.message = 'Check out the upload controller!';

  var photoInput = document.getElementById("photo");
  photoInput.addEventListener("change", photoPreview, false)

  function photoPreview(){
    var preview = document.getElementById("preview");
    var photo = document.querySelector('input').files[0];
    var imageType = /^image\//;

    if (imageType.test(photo.type)) {
      var img = document.createElement('img');
      img.classList.add("obj");
      img.file = photo;

      preview.appendChild(img)

      // create a thumbnail preview
      // still not 100% sure what this does--
      // https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications


    }
  };

  function uploadPhoto(){
    var reader = new FileReader();
    reader.onload = (function(anImg) {
      return function(e) {
        anImg.src = e.target.result;
        $http({
          url: '/upload',
          method: 'POST',
          data: {
            imgBase64: e.target.result
          },
          success: function(){
            console.log("sent!");
          },
          failure: function(){
            console.log("awww...");
          }
        });


      };
    })(img);
    reader.readAsDataURL(photo);
  }
});

App.controller('updateController', function($scope){
  $scope.message = 'Check out the update controller!';
})

// console.log('hey we did it!');
