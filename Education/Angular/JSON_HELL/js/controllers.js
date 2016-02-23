/**
 * Created by dmitry on 27.10.15.
 */

(function() {
    'use strict';

    var phonecatController = function($scope, $http) {
        $http.get('test.json').success(function(data) {
        $scope.phones = data;
        });
    };

    var magController = function($scope, $routeParams) {
      $scope.phones = data;
    };

    angular.module('dmitry').controller('phonecatController', ['$scope', '$http',phonecatController]);
    angular.module('dmitry').controller('magController', ['$scope', '$routeParams', magController]);

})();
//
//var phonecatControllers = angular.module('phonecatControllers', []);
//    phonecatControllers.controller('phoneCtrl', function($scope, $http){
//        $http.get('test.json').success(function(data) {
//            $scope.phones = data;
//        });
//        $scope.orderProp = 'name';
//});
