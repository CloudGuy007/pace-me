'use strict';
var app = angular.module('paceMeApp');


app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, ProfileService) {
  $scope.ok = function() {
    //send message
    ProfileService.notifyUser($scope.message)
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.saveBasics = function(runner){
    ProfileService.saveProfile(runner)
    .then(function(res){
    }, function(err){
      console.error("edit profile error:", err);
    });

    $uibModalInstance.close();
  }

  $scope.saveBio = function(runner){
    ProfileService.saveProfile(runner)
    .then(function(res){
    }, function(err){
      console.error("edit profile error:", err);
    });

    $uibModalInstance.close();
  }

  $scope.saveRun = function(runner){
    ProfileService.saveProfile(runner)
    .then(function(res){
    }, function(err){
      console.error("edit profile error:", err);
    });

    $uibModalInstance.close();
  }
});
