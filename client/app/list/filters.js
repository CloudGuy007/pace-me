'use strict';
var app = angular.module('paceMeApp');

app.filter('distance', function() {
	return function(distance){
		distance = parseInt(Math.floor(distance));

    if (distance === 0){
      return "in your town";
    }
    return distance + " miles away";
	}
});

app.filter('paceDiff', function() {
	return function(user, loggedIn){
		var time = user - loggedIn;
		var absTime = Math.abs(time);
		var min = Math.floor(absTime / 60);
		var seconds = absTime - min * 60;

		if(seconds < 10) {
			var diff = min + ':0' + seconds
		} else {
			var diff = min + ':' + seconds;
		}
    if (time > 0){
      return '+ ' + diff;
    } else {
      return '-' + diff;
    }
	}
});

app.filter('minutes2Seconds', function() {
	return function(seconds){
		if(isNaN(seconds) || seconds < 1){
			return seconds;
		} else {
			return new Date(1970, 0, 1).setSeconds(seconds);
		}
	}
});
