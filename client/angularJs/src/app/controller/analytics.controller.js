
(function () {
    "use strict";

    angular
        .module('tracker')
        .controller('analyticsController',analyticsController);
    analyticsController.$inject=['analyticsService','$routeParams','$filter'];
    function analyticsController(analyticsService,$routeParams,$filter){
        var analyticsVm = this;
        analyticsVm.changeFilters=changeFilters;
        init();
        /*analyticsVm.socialChart = {
            type: 'line',
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            series: ['Series A', 'Series B'],
            colors: ['#ED402A', '#F0AB05', '#A0B421', '#00A39F'],
            data :  [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90] ]
        }*/
        function init() {
            analyticsVm.filter = {"name": "last1day"};
            analyticsVm.data = {"name": "fuelVolume"};
            analyticsVm.showChart = false;
            analyticsVm.showError = false;
            analyticsService
                .getVehicleStats($routeParams.vin, analyticsVm.filter.name)
                .then(function (readings) {
                    console.log(readings);
                    setData(readings, analyticsVm.filter.name, analyticsVm.data.name);
                }, function (error) {
                    console.log(error);
                });
        }
        function setData(readings,filter_name,data_name) {

            analyticsVm.socialChart={
                type: 'line',
                labels: [],
                series: [data_name],
                colors: [ '#00A39F'],
                data :  []
            };
            angular.forEach(readings,function (reading) {
                analyticsVm.socialChart.labels.push($filter('date')(reading.timestamp,"yyyy-MM-dd HH:mm:ss"));
                analyticsVm.socialChart.data.push(reading[data_name]);
            });

        }
        function changeFilters(filters){
            analyticsService
                .getVehicleStats($routeParams.vin, analyticsVm.filter.name)
                .then(function (readings) {
                    console.log(readings);
                    setData(readings, analyticsVm.filter.name, analyticsVm.data.name);
                }, function (error) {
                    console.log(error);
                });
        }
    }
})();
