
(function () {
    angular
        .module('tracker')
        .controller('mapController', mapController);
    mapController.$inject = ['mapService', '$routeParams'];
    function mapController(mapService, $routeParams) {
        var mapVm = this;
        init();

        function init() {
            mapVm.map = {
                center: {
                    latitude: 41.8781,
                    longitude:87.6298
                },
                zoom: 2,
                markers: []
            };
            mapService
                .getCoordinates($routeParams.vin)
                .then(function (coordinates) {
                    var data=[];
                    angular.forEach(coordinates,function (coordinate,key) {
                        data.push({
                            coordinates:{
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude
                            },
                            id:key,
                            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        });
                    });
                    if(data.length>0){
                        mapVm.showMap=true;
                        mapVm.noMapData = false;
                    }
                    else{
                        mapVm.showMap=false;
                        mapVm.noMapData = true;
                    }
                    mapVm.map.markers=data;
                    console.log(mapVm.map.markers);
                }, function (error) {
                    console.log(error);
                });

        }
    }
}());