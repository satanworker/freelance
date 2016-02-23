///**
// * Created by dpetrov on 06.07.2015.
// */
//(function(){
////module which contains store
//var app = angular.module('store', []);
//     app.controller('storeController', function(){
//         //it's important to bind properties of controller and variables
//         this.products = gems;
//     });
//    var gems = [
//        {
//          name: 'Ruby',
//          price: '100',
//          description: 'Red and Expensive ',
//          show: true,
//          soldOut: false
//        },
//        {
//          name: 'Azure',
//          price: '1200',
//          description: 'Blue and MonsterHunter',
//          show: true,
//          soldOut: false
//        }
//                ]
//})();
//
var gems = [
    {
        name: 'Azurite',
        price: 2.99,
        textValues: [
            {
                description: 'some text',
                review: 'some review',
                stars: 5
            }
        ]
    },
    { name: 'Ruby',
        price: 3.99,
        textValues: [
            {
                description: 'some text',
                review: 'some review',
                stars: 5
            }
        ]
    }
];

(function(){
var app = angular.module('gemStore', []);
        app.controller('storeController', function($scope){
            this.products = gems;
            this.id = 12;
        });
        app.controller('clickCtrl', function($scope){
           getMyData = function(MyData) {
                $scope.setMaster = function(obj, $event) {
                    MyData = obj.target.getAttribute('data-some');
                    return MyData
                };
                if(MyData == 'some') {
                    console.log('some');
                }
            };
        });
}) ();
