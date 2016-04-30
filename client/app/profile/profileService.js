'use strict';

var app = angular.module('paceMeApp');

app.service('ProfileService', function($http) {
  this.notifyUser = (msg) => {
    return $http.post('/messages/new', msg)
  }

  this.getProfile = (email) => {
    return $http.get(`/users/${email}`)
  }

  this.saveProfile = (user) => {
    console.log("saveProfile user", user);
    var id = user._id;
    return $http.put(`/users/${id}`, user)
  }

})
