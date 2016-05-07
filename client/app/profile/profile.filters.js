(function(){
	angular
		.module('paceMeApp')
		.filter('minutes2Seconds', minutes2Seconds)
		.filter('nothing', nothing)

	function minutes2Seconds(){
		return function(seconds){
			if(isNaN(seconds) || seconds < 1){
				return seconds;
			} else {
				return new Date(1970, 0, 1).setSeconds(seconds);
			}
		}
	}

	function nothing() {
		return function(str) {
			if(str === 'undefined') return "";
			return str;
		}
	}
})();