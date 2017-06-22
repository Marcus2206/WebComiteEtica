var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/coordinadorList', {
       templateUrl: "coordinador/coordinadorList.html",
       controller: "ListCoordinadorController",
       resolve:{
            coordinadors:['coordinadorRemoteResource',function(coordinadorRemoteResource) {
                return coordinadorRemoteResource.list();
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

    $routeProvider.when('/coordinadorNew', {
        templateUrl: "coordinador/coordinadorEdit.html",
        controller: "NewCoordinadorController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

