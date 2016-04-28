'use strict';

var app = angular.module('paceMeApp');

app.service('ListService', function($http) {

  this.getMatchesGuest = (zip) => {
    return $http.get(`/users/guest/${zip}`)
  }

  this.getMatches = (email, radius) => {
    return $http.get(`/users/matches/${email}/${radius}`)
    // .then(function(res) {
    //   this.users = res;
    // })
  }

  this.storeUsers = (users) => {
    this.users = users;
  }

  this.getStoredUsers = (users) => {
    if(this.users) return this.users;
    //make get request
  }

})
