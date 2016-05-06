var app = angular.module('paceMeApp');

app.controller('navCtrl', function($scope, $state, $location, $anchorScroll) {
$scope.sticky = false;

  $scope.$on('stateChange', function() {
    var nav = document.querySelector('nav');

    function getScrollPosition() {
      var scrollPos = window.pageYOffset;
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 200) {
        nav.classList.add('sticky');
        $scope.sticky = true;
      } else {
        nav.classList.remove('sticky');
        $scope.sticky = false;
      }
    }



    if ($location.path() === '/profile') {
      $scope.sticky = false;
      $scope.logoshort = false;

    } else if ($location.path() === '/buddies' || $location.path() === '/') {
      console.log("current state", $location.path());
      window.onscroll = getScrollPosition;
    }

  });

  $scope.editOwnProfile = function(){
    var id = $scope.user.href.split('/');
    id = id[id.length-1];
    $state.go(`profile`, {"id": id});
  }

});
