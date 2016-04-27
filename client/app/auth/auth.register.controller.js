"use strict";

var app = angular.module('paceMeApp');

app.controller('registerCtrl', function($scope, AuthService, Upload, $timeout){

	$scope.enterCode = false;
	$scope.sendText = function(phone) {
		AuthService.sendVerifyText(phone)
		$scope.enterCode = true;
	}
	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)
	}
	
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'auth/upload',
            data: {file: file, 'username': $scope.username}
        }).then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
        }, function (err) {
            console.log('Error status: ' + err.status);
        });
    };

});

	
