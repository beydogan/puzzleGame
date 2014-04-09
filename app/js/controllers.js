'use strict';

/* Controllers */

angular.module('puzzleApp.controllers', [])
  .controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.x = 2;
    $scope.y = 4;
    $scope.a = 50;
    var squareCount = $scope.x * $scope.y;

    $scope.squares = [];
    for (var i = 1; i <= squareCount; i++) {
        $scope.squares.push(i);
    }

    $rootScope.squares = [];
  }])
 