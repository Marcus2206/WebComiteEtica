var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/sedeList', {
       templateUrl: "sede/sedeList.html",
       controller: "ListSedeController",
       resolve:{
            sedes:['sedeRR',function(sedeRR) {
                return sedeRR.list();
            }]
       }
     });
}]);

