
(function () {
    angular
        .module('tracker')
        .controller('vehiclesController',vehiclesController);
    vehiclesController.$inject=['vehiclesService','alertService'];
    function vehiclesController(vehiclesService,alertService){
        var vehiclesVm = this;
        vehiclesVm.changeSort = changeSort;
        init();
        function init(){
            vehiclesVm.sorter = {
                by: 'highAlerts',
                reverse: true
            };
            vehiclesService
                .getVehicles()
                .then(function (vehicles) {
                    vehiclesVm.vehicles = vehicles;
                    console.log(vehiclesVm.vehicles);
                }, function (error) {
                    console.log(error);
                });
            alertService
                .getAlerts()
                .then(function (alerts) {
                    vehiclesVm.alerts = alerts;
                    calculate();
                    console.log(vehiclesVm.alerts);
                }, function (error) {
                    console.log(error);
                });
            function calculate() {
                for(var vehicle in vehiclesVm.vehicles){
                    var flag=0;
                    for(var alert in vehiclesVm.alerts){
                        if(vehiclesVm.vehicles[vehicle].vin==vehiclesVm.alerts[alert].vin){
                            flag=1;
                            vehiclesVm.vehicles[vehicle].highAlerts=vehiclesVm.alerts[alert].highAlerts;
                        }
                    }
                    if(!flag){
                        vehiclesVm.vehicles[vehicle].highAlerts=0;
                    }
                }
                console.log(vehiclesVm.vehicles);
            }

        }
        function changeSort(prop) {
            vehiclesVm.sorter.by = prop;
            vehiclesVm.sorter.reverse = !vehiclesVm.sorter.reverse;
        }



    }
})();