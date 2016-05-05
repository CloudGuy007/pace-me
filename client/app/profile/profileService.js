'use strict';

var app = angular.module('paceMeApp');

app.service('ProfileService', function($http) {
  this.notifyUser = (msg) => {
    return $http.post('/messages/new', msg)
  }

  this.getProfile = (id) => {
    return $http.get(`/users/${id}`)
  }

  this.saveProfile = (user) => {
    var id = user._id;
    return $http.put(`/users/${id}`, user)
    .then(() => {
      this.setUser(user);
    })
  }

  this.setUser = (user) => {
    this.savedUser = user;
    console.log('this.savedUser',this.savedUser);
  }
  this.getSavedUser = () => {
    return this.savedUser;
  }

})
