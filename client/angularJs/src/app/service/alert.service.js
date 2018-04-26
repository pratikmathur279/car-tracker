
(function () {
    "use strict";
    angular
        .module('tracker')
        .service('alertService',alertService);
    alertService.$inject=['$http','$q'];
    function alertService($http,$q) {
        var self=this;
        self.getAlerts = getAlerts;
        self.getAlertsByVin=getAlertsByVin;

        function getAlertsByVin(id){
            return $http.get('http://localhost:8080/api/alerts/'+ id)
                .then(AlertsuccessFn, errorFn);
        }

        function AlertsuccessFn(response) {
            return response.data;
        }

        function getAlerts() {
            return $http.get('http://localhost:8080/api/alerts')
                .then(successFn, errorFn);

        }

        function successFn(response) {
            var vehicles=[];
            var res=[];

            for(var v in response.data){
                vehicles.push(response.data[v].vin);
            }
            for(var v1 in vehicles){
                var count=0;
                for(var v2 in vehicles) {
                    if (vehicles[v1] == vehicles[v2]) {
                        count++;
                    }
                }
                var element={};
                element.vin=vehicles[v1];
                element.highAlerts=count;
                res.push(element);
                }
            return res;
        }

        function errorFn(response) {
            return $q.reject('ERROR: ' + response.statusText);
        }



    }
})();