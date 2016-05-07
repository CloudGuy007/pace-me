(function(){
  angular
    .module('paceMeApp')
    .service('ListService', ListService)

  ListService.$inject = ["$http"];

  function ListService($http){
    this.getMatchesGuest = (zip) => {
      return $http.get(`/users/guest/${zip}`)
    }

    this.getMatches = (id, radius) => {
      return $http.get(`/users/matches/${id}/${radius}`)
    }

    this.getUserStats = (id) => {
      return $http.get(`/users/${id}`)
    }

    this.storeUsers = (users) => {
      this.users = users;
    }

    this.getStoredUsers = (users) => {
      if(this.users) return this.users;
    }
}

})();
