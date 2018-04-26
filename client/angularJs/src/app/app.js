(function () {
    'use strict';

    angular
        .module('tracker',['ngRoute','ngResource','uiGmapgoogle-maps','chart.js','angularUtils.directives.dirPagination'])
        .config(moduleConfig);

    moduleConfig.$inject=['$routeProvider'];

    function moduleConfig($routeProvider){

        $routeProvider
            .when('/vehicles',{
                templateUrl:'app/view/vehicles.tmpl.html',
                controller:'vehiclesController',
                controllerAs:'vehiclesVm'
            })
            .when('/alerts/:id',{
                templateUrl:'app/view/alerts.tmpl.html',
                controller:'alertController',
                controllerAs:'alertVm'
            })
            .when('/map/:vin',{
                templateUrl:'app/view/map.tmpl.html',
                controller:'mapController',
                controllerAs:'mapVm'
            })
            .when('/analytics/:vin',{
                templateUrl:'app/view/analytics.tmpl.html',
                controller:'analyticsController',
                controllerAs:'analyticsVm'
            })
            .otherwise({
                redirectTo: '/vehicles'
            });
    }
})();