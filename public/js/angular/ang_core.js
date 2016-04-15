var App = App || angular.module('App', ['ngRoute', 'ngFileUpload']);

App.config(function($routeProvider){
  // Map our angular controllers to our different views
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
