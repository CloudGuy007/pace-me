"use strict";

var app = angular.module('paceMeApp');

app.controller('authCtrl', function($scope, AuthService){

	$scope.sendText = function(phone) {
		AuthService.sendVerifyText(phone)
	}
	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)
	}

})
