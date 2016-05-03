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

		if(seconds < 10) {mast
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

app.filter('genderFilter', function(){
	return function(runners, gender){
		if(gender === 'both'){
			return runners;
		}
		var result = [];
		for (var i = 0; i < runners.length; i++) {
			if(runners[i].gender === gender){
				result.push(runners[i]);
			}
		}
		return result;
	}
});

app.filter('ageFilter', function(){
	return function(runners, ageRange){
		var result = [];
		if(ageRange === 'all'){
			return runners;
		} else if(ageRange === '55'){
			// When user selects 55 or older
			for (var i = 0; i < runners.length; i++) {
				if(runners[i].age >= parseInt(ageRange)){
					result.push(runners[i]);
				}
			}
		} else{
			// Age Range given
			var range = [parseInt(ageRange.split('-')[0]), parseInt(ageRange.split('-')[1])];
			for (var i = 0; i < runners.length; i++) {
				if(parseInt(runners[i].age) >= range[0] && parseInt(runners[i].age) <= range[1]){
					result.push(runners[i]);
				}
			}
		}
		return result;
	}
});







