"use strict";

var app = angular.module('paceMeApp');

app.controller('adminCtrl', function($scope, AdminService){

  AdminService.getUsers()
  .then(function(res) {
    $scope.users = res.data;
  }, function(err) {
    console.log('err', err);
  })

  $scope.removeUser = function(user) {
    AdminService.removeUser(user)
    .then(function(res) {
      console.log('res', res);
    }, function(err) {
      console.log('err', err);
    })
  }

});
