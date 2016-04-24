"use strict";


var app = angular.module('paceMeApp')

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

	// $locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/html/home.html',
			controller: 'homeCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/html/login.html',
			controller: 'loginCtrl'
		})
		.state('register', {
			abstract: true,
			url: '/register',
			templateUrl: '/html/register.html',
			controller: 'registerCtrl'
		})
		.state('register.initial', {
			url: '',
			templateUrl: '/html/register.initial.html',
			controller: 'registerCtrl'
		})
		.state('register.userInfo', {
			url: '/user-info',
			templateUrl: '/html/register.user-info.html',
			controller: 'registerCtrl'
		})
		.state('register.run', {
			url: '/your-running-info',
			templateUrl: '/html/register.run.html',
			controller: 'registerCtrl'
		})
		.state('list', {
			url: '/buddies',
			templateUrl: '/html/list.html',
			controller: 'listCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: '/html/profile.html',
			controller: 'profileCtrl',
			sp: {
          authenticate: true
        }
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
		loginState: 'login',
    defaultPostLoginState: 'profile'
  });
});
