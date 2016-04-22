'use strict';
var app = angular.module('paceMeApp');

app.controller('profileCtrl', function($scope, $uibModal, $log){
  $scope.user = {
    _id: '1',
    age: 29,
    gender: 'male',
    photo: 'http://static.wixstatic.com/media/62e31f_826fec17ef6440b0b60475eb824dfdad.gif',
    firstName: 'Sean',
    lastName: 'Smith',
    distAway: '5 miles',
    wklyMileage: '30 mi',
    milePace: '8:00',
    runEvent: '5k',
    fastestMile: '6:30',
    longestDistRun: '12 miles',
    fastest5k: '20 minutes',
    fastest10k: '40 minutes',
    fastest15k: '60 minutes',
    fastestHlfMrthn: '3 hours',
    fastestMrthn: '5 hours'
  };


  $scope.items = ['item1', 'item2', 'item3'];

 $scope.animationsEnabled = true;

 $scope.open = function (size) {

   var modalInstance = $uibModal.open({
     animation: $scope.animationsEnabled,
     templateUrl: 'myModalContent.html',
     controller: 'ModalInstanceCtrl',
     size: size,
     resolve: {
       items: function () {
         return $scope.items;
       }
     }
   });

   modalInstance.result.then(function (selectedItem) {
     $scope.selected = selectedItem;
   }, function () {
     $log.info('Modal dismissed at: ' + new Date());
   });
 };

 $scope.toggleAnimation = function () {
   $scope.animationsEnabled = !$scope.animationsEnabled;
 };

});

angular.module('paceMeApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
