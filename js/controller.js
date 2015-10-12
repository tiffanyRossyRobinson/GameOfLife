(function() {
  'use strict';
  angular
    .module('myLife')
    .controller('gameControl', function(boardService, runService, $scope, $routeParams, $location, $rootScope, $parse, $interval, $q){
        $scope.value = true

        //this allows the user to create a table
        $scope.create= function(input){
          $scope.value = false;
          $scope.game = boardService.createTable(input).then(function(resp){
              $scope.game = resp;
              setCellsToFalse(resp);
          })
        };

        //this allows the user to clear all cells
        $scope.clearAll= function(someObject){
          setCellsToFalse(someObject);
        };

        //This will stop the running cycle
        $scope.stop = function(someObject){
          $interval.cancel($scope.promise);
          setCellsToFalse(someObject);
          alert("You can't handle the truth!");
        }

        //This will run the game 
        $scope.start = function(someObject){
          $scope.promise = $interval(function(){
              var needToUpdate = runService.findCellsToChange(someObject).then(function(data){
                data.length === 0 ? 
                (alert("You have reached the end of your journey!"), 
                $interval.cancel($scope.promise)) : 
                toggleCellStatus(data);
              }); 

          }, 500, someObject.iterations);
        }

        //This will occur when a cell button is clicked 
        $scope.selectCell=function(location){
          var thisClass= "isActive" + location;
          var value = $scope.game.classes[thisClass];
          var model = $parse(thisClass);
          model.assign($scope, !(value)); 
          $scope.game.classes[thisClass] = !value;
        };

        var setCellsToFalse = function(gameData){
            var test = Object.keys(gameData.classes);
            _.each(test, function(cell){
              $scope.game.classes[cell] = false;
              var model = $parse(cell); 
              model.assign($scope, false);
            });
            return;
        }

        var toggleCellStatus = function(cellArray){
            _.each(cellArray, function(cell){
              $scope.game.classes[cell] = !($scope.game.classes[cell])
              var model = $parse(cell);
              model.assign($scope, !($scope[cell])); 
            });
        }
    });
})();