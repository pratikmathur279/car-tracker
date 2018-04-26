
(function () {
    "use strict";
    angular
        .module('tracker')
        .service('analyticsService',analyticsService);
    analyticsService.$inject=['$http','$q'];
    function analyticsService($http,$q) {
        var self=this;
        self.getVehicleStats=getVehicleStats;
        function getVehicleStats(vin, filter) {
            return $http.get('http://localhost:8080/api/readings/'+ vin +'?filter='+filter)
                .then(successFn, errorFn);
        }
        function successFn(response) {
            return response.data;
        }

        function errorFn(response) {
            return $q.reject('ERROR: ' + response.statusText);
        }

    }
})();