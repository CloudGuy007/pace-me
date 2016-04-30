'use strict';
var app = angular.module('paceMeApp');

app.controller('profileCtrl', function($scope, $state, $uibModal, $log, ListService, ProfileService) {

console.log("$scope.user", $scope.user);
  ProfileService.getProfile($state.params.id)
    .then(function(res) {
      $scope.runner = res.data;
      var id = $scope.user.href.split('/');
      id = id[id.length-1];
        if (id != $scope.runner._id){
          $scope.editable = false;
        } else {
          $scope.editable = true;
        }
    }, function(err) {
      console.log("err", err);
    });

  $scope.animationsEnabled = true;
  $scope.open = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'sendMessage.html',
      controller: 'ModalInstanceCtrl',
      size: 0
    });
    modalInstance.result.then(function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.editRun = function(runner){
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'runModal.html',
      controller: 'ModalInstanceCtrl',
      size: 0,
      scope: $scope
    });
    $scope.runner = runner;
  }

  $scope.editBasics = function(runner){
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'basics.html',
      controller: 'ModalInstanceCtrl',
      size: 0,
      scope: $scope
    });
    $scope.runner = runner;
  }

  $scope.editAbout = function(runner){
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'bio.html',
      controller: 'ModalInstanceCtrl',
      size: 0,
      scope: $scope
    });
    $scope.runner = runner;
  }
}); //end profileCtrl
