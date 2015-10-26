var app = angular.module('schedulerApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/students/avail',{
            templateUrl: 'views/studAvail.html',
            controller: 'studAvailController'
        })
        .when('/students/change',{
            templateUrl:'views/studChange.html',
            controller: 'studChangeController'
        });


    $locationProvider.html5Mode(true);
});

console.log('student.js loaded');