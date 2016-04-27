'use strict';

var app = angular.module('paceMeApp');

app.service('listService', function($http) {

  this.getUsersGuest = (zip) => {
    return $http.get(`/users/guest/${zip}`)
  }

  this.getMatches = (email, radius) => {
    return $http.get(`/users/matches/${email}/${radius}`)
  }

})
