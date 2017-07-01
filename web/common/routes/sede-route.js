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

    $routeProvider.when('/coordinadorEdit/:idCoordinador', {
        templateUrl: "coordinador/coordinadorEdit.html",
        controller: "EditCoordinadorController",
        resolve: {
                coordinador:['coordinadorRemoteResource','$route',function(coordinadorRemoteResource,$route) {
                return coordinadorRemoteResource.get($route.current.params.idCoordinador);
            }]
        }
    });

    $routeProvider.when('/sedeNew', {
        templateUrl: "sede/sedeEdit.html",
        controller: "NewSedeController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

