
'use strict'

angular
  .module('paceMeApp')
  .controller('listCtrl', function($scope, $state, ListService, $uibModal, $log) {
    $scope.selectedGender = 'both';
    $scope.selectedAgeRange = 'all';
    $scope.selectedSort = 'difMP';
    $scope.runners = []
    $scope.user ? $scope.loggedIn = true : $scope.loggedIn = false

    if ($scope.loggedIn) {
      var hsplits = $scope.user.href.split('/')
      var id = hsplits[hsplits.length - 1]
      ListService.getUserStats(id)
        .then(function(stats) {
          $scope.loggedInUser = stats.data
        }, function(err) {
        })
      ListService.getMatches(id, 10)
        .then(function(res) {
          $scope.runners = res.data.map(e => {
            e.milePace = parseInt(e.milePace, 10);
            e.age = parseInt(e.age, 10);
            e.dist = parseInt(e.dist, 10);
            return e;
          });
        }, function(err) {
        })
    }


    $scope.sortByMilePace = function(runner) {
      if($scope.selectedSort === 'AMP'){
          return runner.milePace;
      } else if ($scope.selectedSort === 'DMP'){
          return (-runner.milePace);
      } else if($scope.selectedSort === 'difMP'){
          return Math.abs(runner.milePace - $scope.loggedInUser.milePace)
      } else if($scope.selectedSort === 'AA'){
          return runner.age
      } else if($scope.selectedSort === 'AD'){
          return (-runner.age);
      } else if($scope.selectedSort === 'DA'){
          return runner.dist;
      } else if($scope.selectedSort === 'DD'){
          return (-runner.dist);
      }
    }

    $scope.getGuestMatches = function(zip) {
      if (zip.length === 5) {
        ListService.getMatchesGuest(zip)
          .then(function(res) {
            var jumbo = document.querySelector('div.jumbotron')
            jumbo.classList.remove('fullview')
            jumbo.classList.add('slide-up')
            $scope.runners = res.data.map(e => {
              e.milePace = parseInt(e.milePace, 10);
              e.age = parseInt(e.age, 10);
              e.dist = parseInt(e.dist, 10);
              return e;
            });
          })
      }
    }

    $scope.newRadius = function(radius) {
      var hsplits = $scope.user.href.split('/')
      var id = hsplits[hsplits.length - 1]
      ListService.getMatches(id, radius)
      .then(function(res) {
        $scope.runners = res.data.map(e => {
            e.milePace = parseInt(e.milePace, 10);
            e.age = parseInt(e.age, 10);
            e.dist = parseInt(e.dist, 10);
            return e;
          });
      }, function(err) {
        console.error("error", err)
      })
    }

    $scope.viewProfile = function(user) {
      $state.go('profile', {
        'id': user._id
      })
    }

    $scope.open = function(size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'listModalContent.html',
        controller: 'listModalCtrl',
        size: size,
      })
    }
  })

  .controller('listModalCtrl', function($scope, $uibModalInstance, $state) {
    $scope.login = function() {
      $state.go('login')
      $uibModalInstance.close()
    }

    $scope.register = function() {
      $state.go('register.initial')
      $uibModalInstance.dismiss('cancel')
    }
  })
