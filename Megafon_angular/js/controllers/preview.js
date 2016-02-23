/**
 * Created by dmitry on 27.10.15.
 */
(function() {
    'use strict';
    var previewCtrl = function($scope,$http,$routeParams){
        $http.get('test.json').success(function(data) {
            $scope.magazine = data.filter(function (elem) {
                return elem.id == $routeParams.magazineId;
            })[0];
        });
    };
    angular.module('megafon').controller('previewCtrl', ['$scope', '$http','$routeParams',previewCtrl]);
})();
