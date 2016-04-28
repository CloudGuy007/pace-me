'use strict';
var app = angular.module('paceMeApp');

app.controller('profileCtrl', function($scope, $state, $uibModal, $log, ListService, ProfileService){

  console.log('storedUsers', ListService.getStoredUsers($scope.user))

console.log("state", $state);

ProfileService.getProfile($state.params.email)
.then(function(res){
  console.log("res.data", res.data);
  $scope.runner = res.data;
}, function(err){
  console.log("err", err);
});

$scope.animationsEnabled = true;
 $scope.open = function() {
   var modalInstance = $uibModal.open({
     animation: $scope.animationsEnabled,
     templateUrl: 'myModalContent.html',
     controller: 'ModalInstanceCtrl',
     size: 0
   });

   modalInstance.result.then(function() {
     $log.info('Modal dismissed at: ' + new Date());
   });
 };

 $scope.toggleAnimation = function () {
   $scope.animationsEnabled = !$scope.animationsEnabled;
 };
});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, ProfileService) {
  $scope.ok = function () {
    //send message
    ProfileService.notifyUser($scope.message)
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
