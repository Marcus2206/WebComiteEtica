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
}]);

