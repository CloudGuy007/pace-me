"use strict";

var app = angular.module('paceMeApp');


app.controller('registerCtrl', function($scope, $state, AuthService, Upload, $timeout){
	$scope.runner = {};

	// $scope.enteringCode = false;
	$scope.sendText = function(number) {
		$scope.enteringCode = true;
		AuthService.sendVerifyText(number)
	}

	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)

		.then(function(res) {
			$state.go('register.run')
		}, function(err) {
			console.log('err', err);
		})
	}

    $scope.submit = function(file) {
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
		$scope.runner.email = $scope.user.email;
		$scope.runner.firstName = $scope.user.givenName;
		$scope.runner.lastName = $scope.user.surname;
		let id = $scope.user.href.split('/');
		$scope.runner.id = id[id.length-1];
		console.log('$scope.runner', $scope.runner);
	}

});
