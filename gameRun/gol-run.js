  window.golRun = function ($q) { 
          var findCellsToChange = function(gameData){
             var deferred = $q.defer();
             var test = Object.keys(gameData.classes);
             var needToUpdate = discoverRequiredUpdates(gameData, test);

             deferred.resolve(needToUpdate);
             return deferred.promise;
          }

          var discoverRequiredUpdates = function(gameData, test){
              var rawUpdateArray = _.map(test, function(thisClass){
                      var aliveNeighbors = discoverLivingNeighbors(Number(thisClass[8]), thisClass[9], gameData); 
                      var singleArray = [];
                      singleArray.push(thisClass);
                      var needToUpdate = [];
                      needToUpdate.push(doesItNeedUpdate(gameData, singleArray, aliveNeighbors));

                      return needToUpdate[0];
                  })
              return _.without(rawUpdateArray, undefined);
          }

          var discoverLivingNeighbors = function(row, col, gameData){
           return _.filter(getNeighbors(row, col), function(aNeighbor){
                      return gameData.classes[aNeighbor] === true; 
                  })
          }

          var getNeighbors = function(row, col){
            return  [ ("isActive" + (row - 1) + col), 
                      ("isActive" + (row + 1) + col), 
                      ("isActive" + (row - 1) + String.fromCharCode(col.charCodeAt(0) - 1)), 
                      ("isActive" + (row - 1) + String.fromCharCode(col.charCodeAt(0) + 1)),
                      ("isActive" + row + String.fromCharCode(col.charCodeAt(0) - 1)),
                      ("isActive" + row + String.fromCharCode(col.charCodeAt(0) + 1)),
                      ("isActive" + (row + 1) + String.fromCharCode(col.charCodeAt(0) - 1)),
                      ("isActive" + (row + 1) + String.fromCharCode(col.charCodeAt(0) + 1))
                    ]
          }

          var doesItNeedUpdate = function(gameData, singleArray, aliveNeighbors){
              var rule1 = firstRule(gameData, singleArray, aliveNeighbors); 
              var rule3 = secondRule(gameData, singleArray, aliveNeighbors); 
              var rule4 = fourthRule(gameData, singleArray, aliveNeighbors); 
              return _.without([rule1[0], rule3[0], rule4[0]], undefined)[0];
          }

          var firstRule = function(gameData, singleArray, aliveNeighbors){
            return _.chain(singleArray)
                .filter(isAlive(gameData))
                .filter(underPopulated(aliveNeighbors))
                .value();
          }

          var secondRule = function(gameData, singleArray, aliveNeighbors){
            return _.chain(singleArray)
                    .filter(isAlive(gameData))
                    .filter(overPopulated(aliveNeighbors))    
                    .value()
          }

          var fourthRule = function(gameData, singleArray, aliveNeighbors){
            return _.chain(singleArray)
                    .filter(isDead(gameData))
                    .filter(correctlyPopulated(aliveNeighbors)) //  function (....) { return function(v) {} }
                    .value()
          }

          function underPopulated(aliveNeighbors) {
            return function() {
              return aliveNeighbors.length < 2
            }
          }

          function overPopulated(aliveNeighbors) {
            return function () {
              return aliveNeighbors.length > 3
            }
          }
          function correctlyPopulated(aliveNeighbors) {
            return function () {
              return aliveNeighbors.length === 3
            }
          }

          function isAlive(gd) {
            return function (data) {
              return gd.classes[data] === true;
            }
          }

          function isDead(gd) {
            return function (data) {
              return gd.classes[data] === false;
            }
          }

          return {
            findCellsToChange: findCellsToChange
          };
}