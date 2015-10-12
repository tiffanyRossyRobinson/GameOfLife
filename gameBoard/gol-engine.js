window.golEngine = function ($q) {

  var createTable = function(data){
   var deferred = $q.defer();
    data.rows = setRows(data.length);
    data.columns = setCols(data.width);
    data.classes = setCells(data); 
    // return data;
    deferred.resolve(data);
    return deferred.promise;
  }

  var setRows = function(length){
    return _.range(length);
  }

  var setCols = function(length){
    var columns= [];
    var l= "A";
    _.times(length, function(){
      columns.push(l);
      l = String.fromCharCode(l.charCodeAt(0) + 1);
    });
    return columns; 
  }

  var setCells = function(gameData){
      gameData.classes = []; 
      _.each(gameData.rows, function(row){
        _.each(gameData.columns, function(col){
          var key = 'isActive' + row + col; 
          gameData.classes[key] = false;
        });
      });
      return gameData.classes; 
  }

  return {
    createTable: createTable
  };
}