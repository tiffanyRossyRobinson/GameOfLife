(function() {
  'use strict';
  angular
    .module('myLife')
    .controller('gameControl', function($scope, $routeParams, $location, $rootScope, $parse, $interval){

      $scope.value = true;

        $scope.create= function(input){
          console.log("game: ", input);
          $rootScope.game = input;

        //This creates the array of the number of rows

          $scope.length= [];

          for(var i=0; i < input.length; i++){
             $scope.length.push(i);
          }

          //This creates the array of the number of columns

          var array = [];

          $scope.width= [];
          var l="A";

          for(var i=0; i < input.width; i++){
             $scope.width.push(l);

              //this mini loop will set the values for the ng-class
             for(var j = 0; j < $scope.length.length; j++){
                var thisClass= 'isActive' + $scope.length[j] + l;
                array.push(thisClass);
                var model = $parse(thisClass);
                model.assign($scope, false);
             }

             l = String.fromCharCode(l.charCodeAt(0) + 1);
          }

          $scope.game.classes= array;

          //This sets the scope values for the rows and columns for the table

          $scope.game.rows = $scope.length;
          $scope.game.columns = $scope.width;
          $scope.value = false;
        }

        //This will occur when a button is clicked 
        $scope.alert=function(location){
          var thisClass= "isActive" + location;

          var currentValue = $scope[thisClass];

          //toggle class 
          currentValue = !currentValue;

          var model = $parse(thisClass);
          model.assign($scope, currentValue); 

       }

       $scope.start = function(someObject){
        console.log("object: ", someObject);
          // $interval( function(){
            var array = someObject.classes;
            // for(var j = 0; j < someObject.iterations; j++){
            $interval(function(){
                // console.log("this is iteration number: ", j);
                
                var needToUpdate = [];
                console.log("this is need to update: ", needToUpdate);
                for(var i = 0; i < array.length; i++){
                  var thisClass = array[i];
                  var elements = thisClass.split("");
                  var row = Number(elements[8]);
                  var col = elements[9];

                  var top= "isActive" + (row-1) + col; 
                  var bottom = "isActive" + (row + 1) + col;
                  var topLeft = "isActive" + (row - 1) + String.fromCharCode(col.charCodeAt(0) - 1);
                  var topRight = "isActive" + (row - 1) + String.fromCharCode(col.charCodeAt(0) + 1);
                  var left = "isActive" + row + String.fromCharCode(col.charCodeAt(0) - 1);
                  var right =  "isActive" + row + String.fromCharCode(col.charCodeAt(0) + 1);
                  var bottomLeft = "isActive" + (row + 1) + String.fromCharCode(col.charCodeAt(0) - 1);
                  var bottomRight = "isActive" + (row + 1) + String.fromCharCode(col.charCodeAt(0) + 1);

                  var neighborsArray = []; 

                  neighborsArray.push(top); 
                  neighborsArray.push(bottom); 
                  neighborsArray.push(topLeft); 
                  neighborsArray.push(topRight); 
                  neighborsArray.push(left); 
                  neighborsArray.push(right); 
                  neighborsArray.push(bottomLeft); 
                  neighborsArray.push(bottomRight); 

                  // console.log("these are the neighbors of: ", thisClass);
                  // console.log("these are the neighbors: ", neighborsArray);

                  var aliveNeighbors = 0; 

                  for(var x = 0; x < neighborsArray.length; x++){
                    var daClass = neighborsArray[x];
                      if($scope[daClass] === true){
                        aliveNeighbors += 1; 
                      }
                  }

                  // console.log("alive neighbors: ", aliveNeighbors);

                  if($scope[thisClass] === true){
                    if(aliveNeighbors < 2){
                      console.log("this is what is ALIVE: ", thisClass);
                      console.log("this cell needs to be DEAD"); 
                      needToUpdate.push(thisClass); 
                    }
                    else if( aliveNeighbors === 2 || aliveNeighbors === 2){
                      console.log("this cell needs to stay alive"); 
                    }
                    else if( aliveNeighbors > 3){
                      console.log("this is what is ALIVE: ", thisClass);
                      console.log("this cell needs to be DEAD"); 
                      needToUpdate.push(thisClass); 
                    }

                  }

                  if($scope[thisClass] === false){ //if the cell is dead
                    if(aliveNeighbors === 3){
                      console.log("this is what is dead: ", thisClass);
                      console.log("this needs to become ALIVE");
                      needToUpdate.push(thisClass);
                    }
                  }

                }

                for(var x = 0; x < needToUpdate.length; x++){
                  console.log("changing the cells: ", needToUpdate[x]);
                  var thisClass = needToUpdate[x];
                  var currentValue = $scope[thisClass];

                  //toggle class 
                  currentValue = !currentValue;

                  var model = $parse(thisClass);
                  model.assign($scope, currentValue); 
                }  
              }, 500, someObject.iterations);

              // }
       }

    });
})();