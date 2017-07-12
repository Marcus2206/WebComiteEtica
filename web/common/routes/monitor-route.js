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

    $routeProvider.when('/monitorEdit/:idMonitor', {
        templateUrl: "monitor/monitorEdit.html",
        controller: "EditMonitorController",
        resolve: {
                coordinador:['monitorRR','$route',function(monitorRR,$route) {
                return monitorRR.get($route.current.params.idCoordinador);
            }]
        }
    });

    $routeProvider.when('/monitorNew', {
        templateUrl: "monitor/monitorEdit.html",
        controller: "NewMonitorController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

