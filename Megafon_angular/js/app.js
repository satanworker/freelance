(function() {
    'use strict';
    var app = angular.module('megafon', ['ngRoute']);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/preview/:magazineId', {
                templateUrl: 'previews.html',
                controller: 'previewCtrl'
            })
            .when('/view/:magazineId', {
                templateUrl: 'view.html',
                controller: 'viewCtrl'
            })
            .otherwise({
                templateUrl: 'main.html',
                controller: 'commonCtrl'
            });
    }]);
})();