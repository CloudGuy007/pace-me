'use strict';

angular.module('paceMeApp', ['paceMeApp.auth', 'paceMeApp.admin', 'paceMeApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'validation.match']).config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
