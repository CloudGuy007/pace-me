'use strict';
var app = angular.module('paceMeApp');


app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, ProfileService) {
  $scope.sendMessage = function(message) {
    //send message
    var number = $scope.runner.phone.match(/\d/g).join('');
    var id = $scope.user.href.split('/');
    id = id[id.length-1];
    $scope.message.phone = number;
    $scope.message.link = id;
    ProfileService.notifyUser(message)
    .then(function(res){
      console.log("text messages res", res);
    }, function(err){
      console.log("text msg error", err);
    });
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  // $scope.saveBasics = function(runner){
  //   ProfileService.saveProfile(runner)
  //   .then(function(res){
  //     console.log('res', res);
  //   }, function(err){
  //     console.error("edit profile error:", err);
  //   });
  //   $uibModalInstance.close();
  // }

  $scope.saveRun = function(runner){
    console.log('runner', runner);
    var paceArr = runner.milePace.split(':');
    runner.milePace = parseInt(paceArr[0]) * 60 + parseInt(paceArr[1]);
    try{
      ProfileService.saveProfile(runner)
    } catch(err) {
      console.log('err', err);
    }

    $uibModalInstance.close();
  }
});
