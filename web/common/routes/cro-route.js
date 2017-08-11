var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/croList', {
       templateUrl: "cro/croList.html",
       controller: "ListCroController",
       resolve:{
            cros:['croRR',function(croRR) {
                return croRR.list();
            }]
       }
     });

//    $routeProvider.when('/croEdit/:idCro', {
//        templateUrl: "cro/croEdit.html",
//        controller: "EditCroController",
//        resolve: {
//                cro:['croRR','$route',function(croRR,$route) {
//                return croRR.get($route.current.params.idCro);
//            }]
//        }
//    });
//
//    $routeProvider.when('/croNew', {
//        templateUrl: "cro/croEdit.html",
//        controller: "NewCroController"
//    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

