"use strict";

var app = angular.module('paceMeApp');

app.controller('registerCtrl', function($scope, $state, AuthService){


	// $scope.enteringCode = false;
	$scope.sendText = function(number) {
		console.log('number', number);
		// console.log('number', $scope.test);
		// $scope.enteringCode = true;
		AuthService.sendVerifyText(number)
		.then(function() {
			// $scope.enteringCode = true;
		}, function(err) {
			console.log('err', err);
		})
	}


	$scope.verifyPhone = function(code) {
		console.log(code);
		AuthService.verifyNumber(code)
		.then(function(res) {
			console.log('ctrlRes');
			$state.go('register.person')
		}, function(err) {
			console.log('err', err);
		})
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


	$scope.getUser = function() {
		console.log('$scope.user', $scope.user);
	}

})
