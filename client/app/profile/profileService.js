'use strict';

var app = angular.module('paceMeApp');

app.service('ProfileService', function($http) {
  this.notifyUser = function() {
    return $http.post('/messages/new')
  }
})
