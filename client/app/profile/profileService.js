(function(){
  angular
    .module('paceMeApp')
    .service('ProfileService', ProfileService)

  ProfileService.$inject = ["$http", "$rootScope"];

  function ProfileService($http, $rootScope) {
    this.notifyUser = (msg) => {
      return $http.post('/messages/new', msg)
    }
    this.getProfile = (id) => {
      return $http.get(`/users/${id}`)
    }
    this.saveProfile = (user) => {
      var id = user._id;
      $http.put(`/users/${id}`, user)
      .then(() => {
        this.savedUser = user;
        $rootScope.$broadcast('saved-profile')
      })
    }
  }
})();