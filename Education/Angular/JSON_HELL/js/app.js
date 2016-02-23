(function() {
    'use strict';

    var app = angular.module('dmitry', ['ngRoute']);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/mag:phoneNumber:phoneCountry', {
                templateUrl: 'view.html',
                controller: 'phonecatController'
            })
            .otherwise({
               templateUrl: 'common.html',
                controller: 'phonecatController'
            });
    }]);
})();

//var phonecatApp = angular.module('phonecatApp', [
//    'ngRoute',
//    'phonecatControllers'
//]);
//phonecatApp.config(['$routeProvider',
//    function($routeProvider) {
//     $routeProvider.
//         when('/mag', {
//             templateUrl: '/common.html',
//             controller: 'phoneCtrl'
//         }).
//         when ('/mag:phoneName',{
//         templateUrl: '/view.html',
//         controller: 'phoneCtrl'
//     }).otherwise({
//             redirectTo: '/common.html',
//             controller: 'phoneCtrl'
//         });
//    }
//]);