
(function () {
    angular
        .module('tracker')
        .service('mapService',mapService);
    mapService.$inject=['$http','$q'];
    function mapService($http,$q){

        var self=this;
        self.getCoordinates = getCoordinates;
        function getCoordinates(vin) {
            return $http.get('http://localhost:8080/api/readings/'+ vin)
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