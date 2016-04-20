'use strict';

angular.module('paceMeApp.auth', ['paceMeApp.constants', 'paceMeApp.util', 'ngCookies', 'ui.router']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
