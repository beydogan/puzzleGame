'use strict';

// Declare app level module which depends on filters, and services
var puzzleApp = angular.module('puzzleApp', [
  'ngRoute',
  'puzzleApp.filters',
  'puzzleApp.controllers',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
}]);
