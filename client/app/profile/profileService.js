'use strict';

var app = angular.module('paceMeApp');

app.service('ProfileService', function($http) {
  this.notifyUser = function(msg) {
    // console.log(msg);
    return $http.post('/messages/new', msg)
  }
})