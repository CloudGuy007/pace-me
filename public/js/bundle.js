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
		.state('list', {
			url: '/buddies',
			templateUrl: '/html/list.html',
			controller: 'listCtrl'
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

'use strict';
var app = angular.module('paceMeApp');

app.controller('listCtrl', function($scope){
  $scope.users = [
    {
    _id: '1',
    age: 29,
    gender: 'male',
    photo: 'http://static.wixstatic.com/media/62e31f_826fec17ef6440b0b60475eb824dfdad.gif',
    firstName: 'Sean',
    lastName: 'Smith',
    distAway: '5 miles',
    wklyMileage: '30 mi',
    milePace: '8:00',
    runEvent: '5k'
  },
  {
  _id: '2',
  age: 26,
  gender: 'female',
  photo: 'https://assets.vg247.com/current//2016/02/taylor_swift_1.jpg',
  firstName: 'Taylor',
  lastName: 'Swift',
  distAway: '15 miles',
  wklyMileage: '10 mi',
  milePace: '7:30'
},
];

$scope.loggedIn = true;

  console.log("listCtrl");
});


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
         if ($(this).scrollTop() > 200){
           $('nav').addClass('sticky');
         } else {
           $('nav').removeClass('sticky');
         }
       });
});
