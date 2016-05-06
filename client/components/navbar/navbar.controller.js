var app = angular.module('paceMeApp');

app.controller('navCtrl', function($scope, $state) {

  $scope.editOwnProfile = function(){
    var id = $scope.user.href.split('/');
    id = id[id.length-1];
    $state.go(`profile`, {"id": id});
  }

});
