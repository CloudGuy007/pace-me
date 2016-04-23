"use strict";


var app = angular.module('paceMeApp')

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/html/home.html',
			controller: 'homeCtrl'
		})
		.state('auth', {
			url: '/auth',
			templateUrl: '/html/auth.html',
			controller: 'authCtrl'
		})
		.state('list', {
			url: '/buddies',
			templateUrl: '/html/list.html',
			controller: 'listCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: '/html/profile.html',
			controller: 'profileCtrl'
		})

	$urlRouterProvider.otherwise('/');

})
.run(function($rootScope){
	$rootScope.$on('$stateChangeSuccess', function(event){
		$rootScope.$broadcast('stateChange');
	});
});

app.run(function($stormpath){
  $stormpath.uiRouter({
    loginState: 'auth',
    defaultPostLoginState: '/'
  });
});
