(function(){
	angular
		.module('paceMeApp')
		.directive('footerView', footerView)

	function footerView() {
		return {
			templateUrl: '/html/footer.html'
		};
	}
})();