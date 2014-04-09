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
  directive('square', function ($rootScope) {

      /*
      Generates random integer between 2 numbers
      Reference: http://stackoverflow.com/questions/10134237/javascript-random-integer-between-two-numbers
      */
      var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      /*
        Generates random x,y coords within window by offset(square size)
      */
      var generateRandomCoords = function(offset){
        return {
          x: getRandomInt(0, window.innerWidth - offset),
          y: getRandomInt(0, window.innerHeight - offset)
        }
      }

      /*

      */
      var isInGrid = function(squareX,squareY, squareSize, grid){
        return !(
            ( ( squareY + squareSize ) < ( grid.offset().top ) ) ||
            ( squareY > ( grid.offset().top + grid.height() ) ) ||
            ( ( squareX + squareSize ) < grid.offset().left ) ||
            ( squareX > ( grid.offset().left + grid.width() ) )
          );
      }

      /*
        Checks whether two shapes are colliding
        Reference: http://www.benjaminhorn.se/code/pixel-accurate-collision-detection-with-javascript-and-canvas/
      */
      var isCollide = function(source, target){
         return !(
              ( ( source.y + source.height ) < ( target.y ) ) ||
              ( source.y > ( target.y + target.height ) ) ||
              ( ( source.x + source.width ) < target.x ) ||
              ( source.x > ( target.x + target.width ) )
            );
      }

      /*
        Checks whether a square is colliding with other squares in the window
      */
      var checkCollisions = function(square){
        for (var i=0;i< $rootScope.squares.length;i++)
        { 
            if(isCollide(square, $rootScope.squares[i])){
              return true;
            }
        }
        return false;
      }

      var createSquare =function(size){
        var pos = generateRandomCoords(size);

        return {
          x: pos.x,
          y: pos.y,
          height: size,
          width: size
        }

      }

      return {
          restrict:'E',

          link:function (scope, elem, attrs) {
              elem.addClass('square');
              
              elem.css("width", attrs.size + "px");
              elem.css("height", attrs.size + "px");
              var sizeInt = parseInt(attrs.size); 
              var square = createSquare(sizeInt);
              var g = $('#grid');
              var grid = {
                x: Math.floor(g.offset().left),
                y: Math.floor(g.offset().top),
                width: g.width(),
                height: g.height()
              }
console.log(grid);
              while(isCollide(square, grid)){ 
                console.log("re")
                square = createSquare(sizeInt);
              }
              $rootScope.squares.push(square); 

              elem.css("top", square.y + "px");
              elem.css("left", square.x + "px");

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