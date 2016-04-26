"use strict";

var app = angular.module('paceMeApp');

app.controller('registerCtrl', function($scope, $state, AuthService){

	$scope.person = {};


	// $scope.enteringCode = false;
	$scope.sendText = function(number) {
		console.log('number', number);
		// console.log('number', $scope.test);
		$scope.enteringCode = true;
		AuthService.sendVerifyText(number)
	}


	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)
		$state.go('register.person')
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
		$scope.person.email = $scope.user.email;
		$scope.person.firstName = $scope.user.givenName;
		$scope.person.lastName = $scope.user.surname;
		console.log('$scope.person', $scope.person);
	}

})
