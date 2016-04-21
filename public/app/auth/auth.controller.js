"use strict";

var app = angular.module('paceMeApp');

app.controller('authCtrl', function($scope, AuthService){

	$scope.enterCode = false;
	$scope.sendText = function(phone) {
		AuthService.sendVerifyText(phone)
		$scope.enterCode = true;
	}
	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)
	}

})
