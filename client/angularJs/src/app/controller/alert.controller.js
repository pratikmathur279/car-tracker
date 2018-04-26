
(function () {
    angular
        .module('tracker')
        .controller('alertController', alertController);
    alertController.$inject = ['alertService','$routeParams'];
    function alertController(alertService,$routeParams) {
        var alertVm = this;
        alertVm.changeSort = changeSort;
        init();
        function init(){
            alertVm.sorter = {
                by: 'timestamp',
                reverse: true
            };
            alertService
                .getAlertsByVin($routeParams.id)
                .then(function (alerts) {
                    alertVm.alerts = alerts;
                    console.log(alertVm.alerts);
                }, function (error) {
                    console.log(error);
                });
        }
        function changeSort(prop) {
            alertVm.sorter.by = prop;
            alertVm.sorter.reverse = !alertVm.sorter.reverse;
        }
    }
}());
