var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/correspondenciaList', {
       templateUrl: "correspondencia/correspondenciaList.html",
       controller: "ListCorrespondenciaController",
       resolve:{
            correspondencias:['correspondenciaRR',function(correspondenciaRR) {
                return correspondenciaRR.listFindAll();
            }]
       }
     });

    $routeProvider.when('/correspondenciaEdit/:idCorrespondencia', {
        templateUrl: "correspondencia/correspondenciaEdit.html",
        controller: "EditCorrespondenciaController",
        resolve: {
                correspondencia:['correspondenciaRR','$route',function(correspondenciaRR,$route) {
                return correspondenciaRR.get($route.current.params.idCorrespondencia);
            }]
        }
    });

    $routeProvider.when('/correspondenciaNew', {
        templateUrl: "correspondencia/correspondenciaEdit.html",
        controller: "NewCorrespondenciaController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

