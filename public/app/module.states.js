"use strict";


var app = angular.module('paceMeApp')

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/app/home/home.html',
			controller: 'homeCtrl'
		})
		
	$urlRouterProvider.otherwise('/');




})
