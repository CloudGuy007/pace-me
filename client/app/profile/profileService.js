'use strict';

var app = angular.module('paceMeApp');

app.service('ProfileService', function() {
  this.notifyUser = function() {
    console.log('notified!');
  }
})
