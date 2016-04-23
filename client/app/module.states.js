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
		.state('register.phone', {
			url: '',
			templateUrl: '/html/register.phone.html',
			controller: 'registerCtrl'
		})
		.state('register.person', {
			url: '/your-info',
			templateUrl: '/html/register.person.html',
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
			controller: 'profileCtrl'
		})

	$urlRouterProvider.otherwise('/');
})

.run(function($rootScope){
	$rootScope.$on('$stateChangeSuccess', function(event){
		$rootScope.$broadcast('stateChange');
	});
});
