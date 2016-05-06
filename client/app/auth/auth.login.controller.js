(function(){
	angular
		.module('paceMeApp')
		.controller('loginCtrl', loginCtrl)
		loginCtrl.$inject = ['$scope', 'AuthService'];

		function loginCtrl($scope, AuthService){

		}
})();