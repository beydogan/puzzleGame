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
  }).
  directive('gridCell', function() {
    return {
    restrict: 'A',
    template: '<td>{{number}}</td>',
    link: function (scope, elem, attrs) {
      scope.number = attrs.gridCellNumber;
      elem.css("width", attrs.gridCellSize + "px");
      elem.css("height", attrs.gridCellSize + "px");
      console.log(attrs);
    }
  
  
  }
  }).
  directive('square', function () {

      return {
          restrict:'E',
          link:function (scope, elem, attrs) {
              elem.addClass('square');
              elem.css("width", attrs.size + "px");
              elem.css("height", attrs.size + "px");


          }
      };
  }).
  /* 
    Directive: Draggable 
    References: http://docs.angularjs.org/guide/compiler

    mousemove and mouseup events must be binded to $document not the element.
    When its binded to the element, mouse pointer is going outside of the element
    and onMouseMove function is not working properly.
  */
  directive('draggable', ['$document', function($document) {
    return function(scope, element) {
      var el = element[0];
      $(el).css("position", "absolute");
      $(el).css("cursor", "pointer");

      var dragging, dragX, dragY;
      el.addEventListener(
        'mousedown',
        function(e) {
          if(!dragging){
            dragX = e.clientX - e.target.offsetLeft;
            dragY = e.clientY - e.target.offsetTop;
            dragging = 1
            $document.bind("mousemove", onMouseMove);
            $document.bind("mouseup", onMouseUp);
          }
          return false;
        },
        false
      );
      

      var onMouseMove = function(e) {
          if(dragging == 1 && el){
            el.style.left = (e.clientX - dragX) + "px";
            el.style.top = (e.clientY - dragY) + "px";
          }
          return false;
      }

      var onMouseUp = function(e) {
          if(dragging == 1 && el){
            el.style.left = (e.clientX - dragX) + "px";
            el.style.top = (e.clientY - dragY) + "px";
            dragging = null;
            dragX = null;
            dragY = null;
          }
          return false;
      };
      
    }
  }])