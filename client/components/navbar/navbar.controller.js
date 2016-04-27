var app = angular.module('paceMeApp');

app.controller('navCtrl', function($scope, $state, $location, $anchorScroll) {
$scope.sticky = false;
  $scope.$on('stateChange', function() {

    var nav = document.querySelector('nav');

    function getScrollPosition() {
      var scrollPos = window.pageYOffset;
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        nav.classList.add('sticky');
        $scope.sticky = true;
      } else {
        nav.classList.remove('sticky');
        $scope.sticky = false;
      }
    }


    if ($location.path() === '/profile') {
      $scope.sticky = false;

    } else if ($location.path() === '/buddies' || $location.path() === '/') {
      window.onscroll = getScrollPosition;
    }

  });

});
