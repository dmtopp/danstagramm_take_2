var App = App || angular.module('App', ['ui.router', 'ngFileUpload', 'ngCookies']);

App.factory('photoService', function($http, $state, $cookies) {
  var photoService = {};

  photoService.getPhotos = function(url) {
    return $http({ method: 'get', url: '/photos/' + url })
  }

  return photoService;
})
