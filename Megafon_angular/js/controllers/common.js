/**
 * Created by dmitry on 27.10.15.
 */
/**
 * Created by dmitry on 27.10.15.
 */

(function() {
    'use strict';
    var commonCtrl = function($scope, $http,$routeParams) {
        $http.get('test.json').success(function(data) {
            $scope.magazines = data;
        });
    };
    angular.module('megafon').controller('commonCtrl', ['$scope', '$http','$routeParams',commonCtrl]);
})();
