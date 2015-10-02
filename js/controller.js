(function() {
  'use strict';
  angular
    .module('myLife')
    .controller('gameControl', function($scope, $routeParams, $location, $rootScope, $parse, $interval){

        $scope.value = true

        $scope.create= function(input){
          $scope.value = false;
          //This creates the array of the number of rows
          $scope.game.rows= [];
          $scope.game.rows = _.range(input.length);

          //This creates the array of the number of columns
          $scope.game.classes = [];
          $scope.game.columns= [];
          var l= "A";

          _.times(input.width, function(){
            $scope.game.columns.push(l);
            _.times($scope.game.rows.length, function(i){
                var thisClass= 'isActive' + $scope.game.rows[i] + l;
                $scope.game.classes.push(thisClass);
                var model = $parse(thisClass);
                model.assign($scope, false);
            });
            l = String.fromCharCode(l.charCodeAt(0) + 1);
          });
        };

        //this allows the user to clear all cells
        $scope.clearAll= function(someObject){
          _.each(someObject.classes, function(data){
            var model = $parse(data);
            model.assign($scope, false); 
          });  
        };

        //This will occur when a cell button is clicked 
        $scope.alert=function(location){
          var thisClass= "isActive" + location;
          var model = $parse(thisClass);
          model.assign($scope, !($scope[thisClass])); 
        };

        //This will stop the running cycle
        $scope.stop = function(someObject){
          alert("You can't handle the truth!");
          $interval.cancel($scope.promise);
        }

        //This will run the game 
        $scope.start = function(someObject){
          var array = someObject.classes;
          $scope.promise = $interval(function(){
              var needToUpdate = [];
              _.each(array, function(data){
                  var thisClass = data;
                  var row = Number(thisClass[8]);
                  var col = thisClass[9];

                  var aliveNeighbors = _.filter([
                      ("isActive" + (row-1) + col), 
                      ("isActive" + (row + 1) + col), 
                      ("isActive" + (row - 1) + String.fromCharCode(col.charCodeAt(0) - 1)), 
                      ("isActive" + (row - 1) + String.fromCharCode(col.charCodeAt(0) + 1)),
                      ("isActive" + row + String.fromCharCode(col.charCodeAt(0) - 1)),
                      ("isActive" + row + String.fromCharCode(col.charCodeAt(0) + 1)),
                      ("isActive" + (row + 1) + String.fromCharCode(col.charCodeAt(0) - 1)),
                      ("isActive" + (row + 1) + String.fromCharCode(col.charCodeAt(0) + 1))
                      ], function(data){
                      return $scope[data] === true; 
                  })

                 var singleArray = [];
                 singleArray.push(thisClass);

                 needToUpdate.push(_.filter(singleArray, function(data){
                   return ($scope[data] === true && (aliveNeighbors.length < 2 || aliveNeighbors.length > 2)) || ($scope[data] === false && aliveNeighbors.length === 3);
                 }).join())

                 needToUpdate = _.without(needToUpdate, "");
              });
              
              needToUpdate.length === 0 ? (alert("You have reached the end of your journey!"), $interval.cancel($scope.promise)) : 
                  _.each(needToUpdate, function(data){
                    var model = $parse(data);
                    model.assign($scope, !($scope[data])); 
                  });
          }, 500, someObject.iterations);
        }
    });
})();