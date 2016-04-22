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
    runEvent: '5k',
    longestDistRun: 'half marathon',
    fastestMileRun: '7:30'

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

$scope.loggedIn = false;

  console.log("listCtrl");
});
