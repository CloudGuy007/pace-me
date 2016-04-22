'use strict';

var app = angular.module('paceMeApp');

app.service('AuthService', function($http) {

  this.sendVerifyText = (phone) => {
    var number = {phoneNumber: phone}
    return $http.post('/auth/phone', number)
    .then((res) => {
      //request_id is for nexmo, store to use for verifyNumber
      this.request_id = res.data.request_id;
    }, function(err) {
      console.log('err', err);
    })
  }

  this.verifyNumber = (pin) => {
    var code = {
      pin: pin,
      request_id: this.request_id
    };
    return $http.post('/auth/phone/verify', code)
    .then(function(res) {
      console.log('verify res', res);
    }, function(err) {
      console.log('err: ', err);
    })
  }

})
