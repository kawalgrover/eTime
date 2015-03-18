'use strict';

var app = angular
    .module('eTimeApp', ['ngRoute', 'restangular']);

app.config(function ($routeProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('http://localhost:3000');

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })
            .otherwise({
            redirectTo: '/'
            });
    });

app.factory('SunRise',function() {

    });
