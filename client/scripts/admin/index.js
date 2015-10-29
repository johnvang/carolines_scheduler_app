var app = angular.module('schedulerApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        //.when('/admin',{
        //    templateUrl: 'views/adminHome.html',
        //    controller: 'adminHomeController'
        //})
        .when('/admin/avail',{
            templateUrl:'views/adminAvail.html',
            controller: 'adminAvailController'
        })
        .when('/admin/change',{
            templateUrl: 'views/adminChange.html',
            controller: 'adminChangeController'
        })
        .when('/admin/reg', {
            templateUrl: 'views/adminReg.html',
            controller: 'adminRegController'
        })
        .when('/admin/schedule', {
            templateUrl: 'views/adminSchedule.html',
            controller: 'adminScheduleController'
        });

    $locationProvider.html5Mode(true);
});
