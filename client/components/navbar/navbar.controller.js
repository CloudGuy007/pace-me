var app = angular.module('paceMeApp');

app.controller('navCtrl', function($scope, $state, $location, $anchorScroll){

  $scope.$on('stateChange', function(){
    console.log("$location", $location.path());
    if ($location.path() === '/buddies' || $location.path() === '/'){
      $(document).ready(function(){
             $(window).scroll(function() {
               if ($(this).scrollTop() > 10){
                 $('nav').addClass('sticky');
               } else {
                 $('nav').removeClass('sticky');
               }
             });
      });
    }
    if ($location.path() === '/profile') {
      $(document).ready(function(){
          $('nav').removeClass('sticky').addClass('profile-nav');
      });
    }
  });

});
