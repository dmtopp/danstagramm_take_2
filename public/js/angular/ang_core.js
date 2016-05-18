var App = App || angular.module('App', ['ngRoute', 'ngFileUpload', 'ngCookies']);

App.factory("loginManager", ['$cookies',
  function($cookies){
    var username = '';

    return {
			setCookieData: function(username) {
				userName = username;
				$cookies.put("userName", username);
			},
			getCookieData: function() {
				userName = $cookies.get("userName");
				return userName;
			},
			clearCookieData: function() {
				userName = "";
				$cookies.remove("userName");
			}
		}

}])

App.config(function($routeProvider, $locationProvider){
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
    })
    .when('/signup', {
      templateUrl : '/views/pages/signup.html',
      controller  : 'signupController'
    })
    .when('/logout', {
      templateUrl : '/views/pages/home.html',
      controller  : 'logoutController'
    });
})
