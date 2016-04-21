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

	$urlRouterProvider.otherwise('/');




})
