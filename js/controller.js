(function() {
  'use strict';
  angular
    .module('myLife')
    .controller('gameControl', function($scope, $routeParams, $location, $rootScope, $parse, $interval){

      $scope.value = true

        $scope.create= function(input){
          // console.log("game: ", input);
          $rootScope.game = input;

          //This creates the array of the number of rows
          $scope.length= [];
          $scope.length = _.range(input.length);

          //This creates the array of the number of columns
          $scope.game.classes = [];
          $scope.width= [];

          var l="A";

          _.times(input.width, function(){
            $scope.width.push(l);
            var j = 0; 
            _.times($scope.length.length, function(){
                var thisClass= 'isActive' + $scope.length[j] + l;
                $scope.game.classes.push(thisClass);
                var model = $parse(thisClass);
                model.assign($scope, false);
                j += 1;
            });
            l = String.fromCharCode(l.charCodeAt(0) + 1);
          });

          //This sets the scope values for the rows and columns for the table
          $scope.game.rows = $scope.length;
          $scope.game.columns = $scope.width;
          $scope.value = false;
        };

        //this allows the user to clear all cells
        $scope.clearAll= function(someObject){
          _.each(someObject.classes, function(data){
            var model = $parse(data);
            model.assign($scope, false); 
          });  
        };

        //This will occur when a button is clicked 
        $scope.alert=function(location){
          var thisClass= "isActive" + location;
          var model = $parse(thisClass);
          model.assign($scope, !($scope[thisClass])); 
        };

       $scope.stop = function(someObject){
          alert("You can't handle the truth!");
          $interval.cancel($scope.promise);
       }

       $scope.start = function(someObject){
            var array = someObject.classes;

            $scope.promise = $interval(function(){
                var needToUpdate = [];
                _.each(array, function(data){
                    var thisClass = data;
                    var elements = thisClass.split("");
                    var row = Number(elements[8]);
                    var col = elements[9];

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