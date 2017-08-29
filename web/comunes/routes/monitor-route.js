var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/monitorList', {
       templateUrl: "monitor/monitorList.html",
       controller: "ListMonitorController",
       resolve:{
            monitors:['monitorRR',function(monitorRR) {
                return monitorRR.list();
            }]
       }
     });
}]);

