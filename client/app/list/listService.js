'use strict';

var app = angular.module('paceMeApp');

app.service('listService', function($http) {

  this.getInitial = function() {
    //get initial group of users
    return $http.get('/something')
  }



})
