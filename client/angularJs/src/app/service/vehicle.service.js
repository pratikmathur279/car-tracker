
(function () {
    angular
        .module('tracker')
        .service('vehiclesService',vehiclesService);
    vehiclesService.$inject=['$http','$q'];
    function vehiclesService($http,$q){

        var self=this;
        self.getVehicles = getVehicles;
        function getVehicles() {
            return $http.get('http://localhost:8080/api/vehicles')
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