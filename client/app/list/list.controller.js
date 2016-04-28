'use strict';
var app = angular.module('paceMeApp');

app.controller('listCtrl', function($scope, $state, ListService) {


  console.log("current state", $state.current.name);
  console.log("scope user", $scope.user);

  var hsplits = $scope.user.href.split('/');
  var id = hsplits[hsplits.length - 1];
  
  $scope.user ? $scope.loggedIn = true : $scope.loggedIn = false;

  $scope.sortMilePace = function(runner){
    return Math.abs(runner.milePace - $scope.loggedInUser.milePace);
  }

  if ($scope.loggedIn) {
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


  // ListService.storeUsers($scope.users);

  $scope.viewProfile = function(user){
    console.log("user", user);
    $state.go('profile', {
      'email': user.email
    })
  }
  console.log("listCtrl");
});
