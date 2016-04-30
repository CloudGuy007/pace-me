'use strict';
var app = angular.module('paceMeApp');

app.controller('listCtrl', function($scope, $state, ListService) {
  console.log("current state", $state.current.name);
  console.log("scope user", $scope.user);

  $scope.user ? $scope.loggedIn = true : $scope.loggedIn = false;
  console.log("loggedIn", $scope.loggedIn);

  let id = $scope.user.href.split('/');
  id = id[id.length - 1];

  console.log("$scope.user", $scope.user);

  if ($scope.loggedIn) {
    ListService.getMatches(id, 10)
      .then(function(res) {
        console.log("res.data", res.data);
        $scope.runners = res.data;
      }, function(err) {
        console.log("err", err);
      });
  }

  $scope.getGuestMatches = function(zip) {
    if (zip.length === 5) {
      ListService.getMatchesGuest(zip)
        .then(function(res) {
          console.log("guest data", res.data);
          $scope.runners = res.data;
        })
    }
  }

  $scope.newRadius = function(radius) {
    ListService.getMatches(id, radius)
      .then(function(res) {
        console.log("res.data", res.data);
        $scope.runners = res.data;
      }, function(err) {
        console.log("err", err);
      });
  }

  $scope.viewProfile = function(user) {
    console.log("user", user);
    $state.go('profile', {
      'email': user.email
    })
  }
  console.log("listCtrl");
});
