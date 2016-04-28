'use strict';
var app = angular.module('paceMeApp');

app.controller('listCtrl', function($scope, $state, ListService) {
  console.log("list ctrl");

  console.log("current state", $state.current.name);
  console.log("scope user", $scope.user);

  $scope.user ? $scope.loggedIn = true : $scope.loggedIn = false;
  console.log("loggedIn", $scope.loggedIn);

  if ($scope.loggedIn) {
    let id = $scope.user.href.split('/');
    id = id[id.length-1];
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


  // ListService.storeUsers($scope.users);

  $scope.viewProfile = function(user){
    console.log("user", user);
    $state.go('profile', {
      'email': user.email
    })
  }
  console.log("listCtrl");
});
