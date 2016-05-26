var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.config(function($stateProvider, $urlRouterProvider){
  // Map our angular controllers to our different views

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('parent', {
      url: '/',
      templateUrl : '/views/pages/parent.html',
      controller  : 'parentController'
    })
    .state('parent.home', {
      url: '/home',
      templateUrl : '/views/pages/home.html',
      controller  : 'homeController'
    })
    .state('parent.login-signup', {
      url: '/login-signup',
      templateUrl : '/views/pages/loginSignup.html',
      controller  : 'loginSignupController'
    })
    .state('parent.upload', {
      url: '/upload',
      templateUrl : '/views/pages/upload.html',
      controller  : 'uploadController'
    })
    .state('parent.update', {
      url: '/update',
      templateUrl : '/views/pages/update_account.html',
      controller  : 'updateController'
    })
    .state('parent.logout', {
      url: '/logout',
      templateUrl : '/views/pages/home.html',
      controller  : 'logoutController'
    });
})
