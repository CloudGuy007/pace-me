'use strict';

var app = angular.module('paceMeApp');

app.service('AuthService', function($http) {

  this.sendVerifyText = (phone) => {
    var number = {phoneNumber: phone}
    return $http.post('/auth/phone', number)
    .then((res) => {
      console.log('serviceRes', res);
      //request_id is for nexmo, store to use for verifyNumber
      this.request_id = res.data.request_id;
      return res.data.status
      // this.setRequest(res.data.request_id)
    })
  }

  this.verifyNumber = (pin) => {
    var code = {
      pin: pin,
      request_id: this.request_id
    };
    return $http.post('/auth/phone/verify', code)
  }

  this.newUser = (user) => {
    return $http.post('/users/new', user)
  }


})
