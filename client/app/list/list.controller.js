'use strict';
var app = angular.module('paceMeApp');

app.controller('listCtrl', function($scope, $state, ListService) {

  console.log("current state", $state.current.name);
  console.log("scope user", $scope.user);

  $scope.user ? $scope.loggedIn = true : $scope.loggedIn = false;
  console.log("loggedIn", $scope.loggedIn);

  $scope.sortMilePace = function(runner){
    return Math.abs(runner.milePace - $scope.loggedInUser.milePace);
  }

  if ($scope.loggedIn) {
    var hsplits = $scope.user.href.split('/');
    var id = hsplits[hsplits.length - 1];
    ListService.getUserStats(id)
    .then(function(stats){
      $scope.loggedInUser = stats.data;
    }, function(err){
      console.log(err);
    });
    ListService.getMatches(id, 10)
      .then(function(res) {
        console.log("res.data", res.data);
        $scope.runners = res.data;
      }, function(err) {
        console.log("err", err);
      });
    }

    $scope.getGuestMatches = function(zip){
      if (zip.length === 5) {
        ListService.getMatchesGuest(zip)
        .then(function(res){
          var jumbo = document.querySelector('div.jumbotron');
          jumbo.classList.remove('fullview');
          jumbo.classList.add('slide-up');

          console.log("guest data", res.data);
          $scope.runners = res.data;
        })
      }
    }

    $scope.newRadius = function(radius){
      ListService.getMatches(id, radius)
        .then(function(res) {
          console.log("res.data", res.data);
          $scope.runners = res.data;
        }, function(err) {
          console.log("err", err);
        });

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
      'id': user._id
    })
  }
  console.log("listCtrl");
});
