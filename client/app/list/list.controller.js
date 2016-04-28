'use strict';
var app = angular.module('paceMeApp');

app.controller('listCtrl', function($scope, $state, ListService) {

  console.log("current state", $state.current.name);

  $scope.user ? $scope.loggedIn = true : $scope.loggedIn = false;
  console.log("loggedIn", $scope.loggedIn);
  // $scope.viewProfile = function(index) {
  //   console.log(viewProfile);
  //   console.log(index);
  // }

  console.log("$scope.user", $scope.user);

  if ($scope.loggedIn) {
    ListService.getMatches($scope.user.email, 10)
      .then(function(res) {
        console.log("res.data", res.data);
        $scope.runners = res.data;
      }, function(err) {
        console.log("err", err);
      });
  }

    $scope.getGuestMatches = function(zip){
      if (zip.length === 5){
        ListService.getMatchesGuest(zip)
        .then(function(res){
          console.log("guest data", res.data);
          $scope.runners = res.data;
        })
      }

    }





  // ListService.storeUsers($scope.users);

  // $scope.viewProfile = function(user){
  //   console.log("user", user);
  //   ListServce.storeUsers(user);
  // }
  console.log("listCtrl");
});
