"use strict";

var app = angular.module('paceMeApp');

app.controller('registerCtrl', function($scope, AuthService){

	$scope.enterCode = false;
	$scope.sendText = function(phone) {
		AuthService.sendVerifyText(phone)
		$scope.enterCode = true;
	}
	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)
	}

	$scope.uploadFile = function(files) {
			var fd = new FormData();
			fd.append("file", files[0]);

			AuthService.uploadPhoto(fd)
			.then(function(res) {
				console.log('Succes => ', res);
			}, function(err) {
				console.log('err: ', err);
			})
	}

})
