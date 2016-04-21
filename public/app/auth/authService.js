'use strict';

var app = angular.module('paceMeApp');

app.service('AuthService', function($http) {

  this.sendVerifyText = function(phone) {
    var number = {phone: phone}
    return $http.post('/auth/phone', number)
    .then(function(res) {
      console.log(res);
      this.request_id = res;
      console.log();
    })
  }

  this.verifyNumber = function(pin) {
    var code = {pin: pin}
    return $http.post('/auth/phone/verify', code)
  }

})
