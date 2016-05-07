(function(){
	angular
		.module('paceMeApp')
		.controller('navCtrl', navCtrl);

	navCtrl.$inject = ["$scope", "$state"];
	function navCtrl($scope, $state) {

		$scope.editOwnProfile = function(){
			var id = $scope.user.href.split('/');
			id = id[id.length-1];
			$state.go(`profile`, {"id": id});
		}

	}
})();