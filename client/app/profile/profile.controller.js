(function() {
  angular
    .module('paceMeApp')
    .controller('profileCtrl', profileCtrl)

    profileCtrl.$inject = ['$scope', '$state', '$uibModal', '$log', 'ListService', 'ProfileService']

    function profileCtrl($scope, $state, $uibModal, $log, ListService, ProfileService) {

      ProfileService.getProfile($state.params.id)
        .then(function(res) {
          $scope.runner = res.data;
          var id = $scope.user.href.split('/');
          id = id[id.length - 1];
          if (id != $scope.runner._id) {
            $scope.editable = false;
          } else {
            $scope.editable = true;
          }
        }, function(err) {});

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

      $scope.editRun = function(runner) {
        $scope.runnerEdit = angular.copy(runner);
        var mile = $scope.runnerEdit.milePace;
        var min = Math.floor(mile / 60);
        var sec = mile - min * 60;
        $scope.runnerEdit.milePace = `${min}:${sec}`;
        for (let key in $scope.runnerEdit) {
          if ($scope.runnerEdit[key] === 'undefined') $scope.runnerEdit[key] = '';
        }

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'runModal.html',
          controller: 'ModalInstanceCtrl',
          size: 0,
          scope: $scope
        });
        modalInstance.result.then(function() {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }

      $scope.$on('saved-profile', function() {
        $scope.runner = ProfileService.savedUser;
      })

      $scope.editBasics = function(runner) {
        $scope.runnerEdit = angular.copy(runner);
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'basics.html',
          controller: 'ModalInstanceCtrl',
          size: 0,
          scope: $scope
        });
      }
    }
})();
