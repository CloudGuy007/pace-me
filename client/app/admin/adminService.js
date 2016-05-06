(function(){
	angular
		.module('paceMeApp')
		.service('AdminService', AdminService)

	AdminService.$inject = ['$http'];

	function AdminService($http){
		this.getUsers = function() {
	    	return $http.get('users/matches/6ReS2xn7B199PjvDPrMlYO/100')
	  	}
		this.removeUser = function(user) {
			return $http.delete(`users/delete/${user._id}`, user)
	  	}
	}
})();