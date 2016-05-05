'use strict';

angular
  .module('paceMeApp')
  .directive('inputTime', function() {
    return {
      require: 'ngModel',
      link: function($scope, element, attrs, ngModelController) {
        console.log('NGMODELCONTROLLER', ngModelController)
        console.log('ATTRS', attrs)
        console.log('ELEMENT', element)
        console.log('$SCOPE', $scope)

      }
    }
  })
