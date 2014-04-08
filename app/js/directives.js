'use strict';

/* Directives */


angular.module('puzzleApp.directives', []).
  directive('grid', function() {
    return {
    restrict: 'A',
    templateUrl: 'partials/grid.html',
    link: function (scope, elem, attrs) {
      scope.rows = [
        [1,2,3,4],
        [5,6,7,8]
      ]
      
      scope.size = 5;
      console.log(attrs);
    }
  
  
  }
  }).directive('gridCell', function() {
    return {
    restrict: 'A',
    template: '<td>{{number}}</td>',
    link: function (scope, elem, attrs) {
      scope.number = attrs.gridCellNumber;
      elem.css("border", "1px solid red");
      elem.css("width", attrs.gridCellSize + "px");
      elem.css("height", attrs.gridCellSize + "px");
      console.log(attrs);
    }
  
  
  }
  });

