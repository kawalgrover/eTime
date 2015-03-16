'use strict';

/**
 * @ngdoc function
 * @name eTimeApp.controller:AboutController
 * @description
 * # AboutController
 * Controller of the eTimeApp
 */
angular.module('eTimeApp')
  .controller('AboutController', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
