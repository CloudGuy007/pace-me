"use strict";

var app = angular.module('paceMeApp');


app.controller('registerCtrl', function($scope, $state, AuthService, Upload, $timeout){


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

		.then(function(res) {
			console.log('ctrlRes');
			$state.go('register.run')
		}, function(err) {
			console.log('err', err);
		})
	}

    $scope.submit = function(file) {
			console.log('file', file);
      if (file) {
        $scope.upload(file);
      }
    };


    $scope.upload = function (file) {
        Upload.upload({
            url: 'auth/upload',
            data: {file: file}
        }).then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
        }, function (err) {
            console.log('Error status: ' + err.status);
        });
    };






	$scope.getUser = function() {
		$scope.person.email = $scope.user.email;
		$scope.person.firstName = $scope.user.givenName;
		$scope.person.lastName = $scope.user.surname;
		console.log('$scope.person', $scope.person);
	}

});
