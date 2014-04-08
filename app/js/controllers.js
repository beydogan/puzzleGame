'use strict';

/* Controllers */

angular.module('puzzleApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function($scope) {
    $scope.x = 15;
    $scope.y = 15;
    $scope.a = 50;
  }])
 