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
	return function(arg1, arg2){
		console.log("arg1", arg1);
    console.log("arg2", arg2);
    var diff = arg1-arg2;
    if (diff > 0){
      return '+' + diff + ' seconds';
    } else {
      return diff + ' seconds';
    }
	}
});
