(function(){
  angular
    .module('paceMeApp')
    .controller('registerCtrl', registerCtrl)
    registerCtrl.$inject = ['$scope', '$state', 'AuthService', 'Upload', '$timeout'];
    function registerCtrl($scope, $state, AuthService, Upload, $timeout){
      $scope.runner = {};
      $scope.sendText = function(number) {
        if (number.toString().length !== 10) {
          $scope.tenDigits = true;
          return;
        }
        AuthService.sendVerifyText(number)
        .then(function(res) {
          console.log("res: ", res);
          if (res !== "0") return $scope.badNumber = true;
          $scope.enterPin = true;
        }, function(err) {
          console.log('err', err);
        })
      }
      $scope.verifyPhone = function(code) {

        if (code < 1000) code = '0' + code;

        AuthService.verifyNumber(code)
        .then(function(res) {
          if (res.data.status === "16") return $scope.wrongPin = true;
          if (res.data.status !== "0") return console.log(res)
            $state.go('register.bio')
        }, function(err) {
          console.log('err', err);
        })
      }

      $scope.upload = function(file) {
        console.log("$scope.upload file", file);
      };

      $scope.goToRunStats = function(file) {
        if ($scope.runner.zipCode){
          if (file) {
            Upload.upload({
              url: 'auth/upload',
              data: {
                file: file
              }
            }).then(function(res) {
              $scope.runner.photo = res.data;
              $scope.photoSavedMessage = true;
              $state.go('register.run');
            }, function(err) {
              console.log('Error status: ' + err.status);
            });
          } else {
            $state.go('register.run');
          }
        } else {
          $scope.noZip = true;
        }
      }

      $scope.getUser = function() {
        $scope.runner.email = $scope.user.email;
        var id = $scope.user.href.split('/');
        $scope.runner._id = id[id.length - 1];
        if ($scope.runner.milePace){
          AuthService.newUser($scope.runner)
          .then(function(res) {
            $state.go('list')
          }, function(err) {
            console.log('err', err);
          })
        } else {
          $scope.noMile = true;
        }
      }
    }
})();
