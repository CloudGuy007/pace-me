"use strict";


var app = angular.module('paceMeApp', ['ui.router'])


"use strict";


var app = angular.module('paceMeApp')

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/html/home.html',
			controller: 'homeCtrl'
		})
		.state('auth', {
			url: '/auth',
			templateUrl: '/html/auth.html',
			controller: 'authCtrl'
		})

	$urlRouterProvider.otherwise('/');




})

"use strict";

var app = angular.module('paceMeApp');

app.controller('authCtrl', function($scope, AuthService){

	$scope.enterCode = false;
	$scope.sendText = function(phone) {
		AuthService.sendVerifyText(phone)
		$scope.enterCode = true;
	}
	$scope.verifyPhone = function(code) {
		AuthService.verifyNumber(code)
	}

})

'use strict';

var app = angular.module('paceMeApp');

app.service('AuthService', function($http) {

  this.sendVerifyText = function(phone) {
    var number = {phone: phone}
    return $http.post('/auth/phone', number)
    .then(function(res) {
      console.log('first res: ', res);
    })
  }

  this.verifyNumber = function(pin) {
    var code = {pin: pin}
    return $http.post('/auth/phone/verify', code)
  }

})

"use strict";

var app = angular.module('paceMeApp');

app.controller('homeCtrl', function($scope){

	console.log('homeCtrl');

})


var app = angular.module('paceMeApp');

app.directive('footerView', function() {
  return {
    templateUrl: '/html/footer.html'
  };
});


var app = angular.module('paceMeApp');

app.directive('navbar', function() {
  return {
    templateUrl: '/html/navbar.html'
  };
});

$(document).ready(function(){
  
       $(window).scroll(function() {
         if ($(this).scrollTop() > 10){
           $('nav').addClass('sticky');
         } else {
           $('nav').removeClass('sticky');
         }
       });
});
