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
}]);

