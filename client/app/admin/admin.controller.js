(function(){
  angular
    .module('paceMeApp')
    .controller('adminCtrl', adminCtrl)

  adminCtrl.$inject = ['$scope', 'AdminService'];

  function adminCtrl(){
    AdminService.getUsers()
    .then(function(res) {
      $scope.users = res.data;
    }, function(err) {
      console.log('err', err);
    });

    $scope.removeUser = function(user) {
      AdminService.removeUser(user)
      .then(function(res) {
        console.log('res', res);
      }, function(err) {
        console.log('err', err);
      })
    }
  }
})();