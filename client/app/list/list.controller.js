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

  function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className;
}

    $scope.getGuestMatches = function(zip){
      if (zip.length === 5) {
        ListService.getMatchesGuest(zip)
        .then(function(res){
          var jumbo = document.querySelector('div.jumbotron');
          jumbo.classList.remove('fullview');
          
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
