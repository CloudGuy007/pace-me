var app = angular.module('paceMeApp');

app.controller('navCtrl', function($scope, $state, $location, $anchorScroll) {
$scope.sticky = false;

  $scope.$on('stateChange', function() {
    var nav = document.querySelector('nav');
    var logoShort = document.querySelector('.navbar-brand');

    $scope.logoshort = true;
    function getScrollPosition() {
      var scrollPos = window.pageYOffset;
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 200) {
        nav.classList.add('sticky');
        logoShort.classList.remove('logoshort');
        $scope.sticky = true;
        $scope.logoshort = false;
      } else {
        nav.classList.remove('sticky');
        logoShort.classList.add('logoshort');
        $scope.sticky = false;
        $scope.logoshort= true;
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
