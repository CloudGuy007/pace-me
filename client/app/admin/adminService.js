'use strict';
'use strict';

var app = angular.module('paceMeApp')

app.service('AdminService', function($http) {

  this.getUsers = function() {
    //need new route to get all users, but maybe limit to 500
    return $http.get('users/matches/6ReS2xn7B199PjvDPrMlYO/100')
  }

  this.removeUser = function(user) {
    return $http.delete(`users/delete/${user._id}`, user)
  }

})
