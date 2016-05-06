"use strict";

var app = angular.module('paceMeApp');


app.controller('registerCtrl', function($scope, $state, AuthService, Upload, $timeout) {
  $scope.runner = {};

  $scope.sendText = function(number) {
    if(number.length !== 10) {
      $scope.tenDigits = true;
      return;
    }
    AuthService.sendVerifyText(number)
      .then(function(status) {
        if (status !== "0") return
        $scope.enterPin = true;
      }, function(err) {
        console.log('err', err);
      })
  }
  $scope.verifyPhone = function(code) {
    AuthService.verifyNumber(code)
      .then(function(res) {
        if (res.data.status === "16") return $scope.wrongPin = true;
        if (res.data.status !== "0") return console.log(res)
        $state.go('register.bio')
      }, function(err) {
        console.log('err', err);
      })
  }

  $scope.uploadPhoto = function(file) {

    if (file) {
      $scope.upload(file);
    }
  };

  $scope.upload = function(file) {
    Upload.upload({
      url: 'auth/upload',
      data: {
        file: file
      }
    }).then(function(res) {
      console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
      $scope.runner.photo = res.data;
      $scope.photoSavedMessage = true;
    }, function(err) {
      console.log('Error status: ' + err.status);
    });
  };

  $scope.goToRunStats = function(runner){
    $state.go('register.run');
  }

  $scope.getUser = function() {
    $scope.runner.email = $scope.user.email;
    var id = $scope.user.href.split('/');
    $scope.runner._id = id[id.length - 1];

    AuthService.newUser($scope.runner)
      .then(function(res) {
        console.log('auth service new user res', res);
        $state.go('list')
      }, function(err) {
        console.log('err', err);
      })
  }

});
