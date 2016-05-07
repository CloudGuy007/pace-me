(function() {
  angular
  .module('paceMeApp')
  .controller('listModalCtrl', listModalCtrl)

  listModalCtrl.$inject = ['$scope', '$uibModalInstance', '$state'];

  function listModalCtrl($scope, $uibModalInstance, $state){
    $scope.login = function() {
      $state.go('login')
      $uibModalInstance.close()
    }
    $scope.register = function() {
      $state.go('register.initial')
      $uibModalInstance.dismiss('cancel')
    }
  }
})();
