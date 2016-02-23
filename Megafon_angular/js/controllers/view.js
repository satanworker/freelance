/**
 * Created by dmitry on 27.10.15.
 */
(function() {
    'use strict';
    var viewCtrl = function($scope,$http,$routeParams){
        $scope.current = 0;
        $http.get('test.json').success(function(data){
            $scope.magazine = data.filter(function(element){
                return element.id == $routeParams.magazineId
            })[0];
        });
        $scope.currentChange  = function(cur) {
            return $scope.current = cur;
        }
    };
    angular.module('megafon').controller('viewCtrl', ['$scope', '$http','$routeParams',viewCtrl]);
})();
/**
 * Created by dmitry on 27.10.15.
 */
