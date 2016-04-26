var app = angular.module('paceMeApp');

app.controller('navCtrl', function($scope, $state, $location, $anchorScroll){

  $scope.$on('stateChange', function(){
    console.log("$location", $location.path());

    if ($location.path() === '/buddies' || $location.path() === '/'){
      // $(document).ready(function(){
      //        $(window).scroll(function() {
      //          if ($(this).scrollTop() > 200){
      //            $('nav').addClass('sticky');
      //          } else {
      //            $('nav').removeClass('sticky');
      //          }
      //        });
      // });

      $scope.sticky = true;
    }

    if ($location.path() === '/profile') {
      $scope.sticky = false;
    }
  });

});
