'use strict';
var app = angular.module('paceMeApp');

app.filter('minutes2Seconds', function() {
	return function(seconds){
		if(isNaN(seconds) || seconds < 1){
			return seconds;
		} else {
			return new Date(1970, 0, 1).setSeconds(seconds);
		}
	}
});

app.filter('nothing', function() {
	return function(str) {
		if(str === 'undefined') return "";
		return str;
	}
})
