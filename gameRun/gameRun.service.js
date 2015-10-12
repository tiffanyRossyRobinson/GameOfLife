(function() {
  'use strict';
  angular
    .module('run')
    .factory('runService', function ($http, $rootScope, $q) {

          //Game Execution Functions
          return golRun($q);
     });

}());

