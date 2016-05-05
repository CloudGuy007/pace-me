'use strict';

// const angular = require('angular');

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
          console.log("$scope.runner", $scope.runner);
        } else {
          $scope.editable = true;
        }
    }, function(err) {
      console.log("err", err);
    });

  $scope.open = function(runner) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'sendMessage.html',
      controller: 'ModalInstanceCtrl',
      size: 0,
      scope: $scope
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.editRun = function(runner){
    // console.log('edit run');
    $scope.runnerEdit = angular.copy(runner);
    var mile = $scope.runnerEdit.milePace;
    var min = Math.floor(mile / 60);
    var sec = mile - min * 60;
    $scope.runnerEdit.milePace = `${min}:${sec}`;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'runModal.html',
      controller: 'ModalInstanceCtrl',
      size: 0,
      scope: $scope
    });
    modalInstance.result.then(function() {
      $scope.runner = ProfileService.getSavedUser();
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

  $scope.editBasics = function(runner){
    $scope.runnerEdit = angular.copy(runner);
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'basics.html',
      controller: 'ModalInstanceCtrl',
      size: 0,
      scope: $scope
    });
  }


}); //end profileCtrl
