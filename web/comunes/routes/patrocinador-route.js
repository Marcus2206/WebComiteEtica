var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/patrocinadorList', {
       templateUrl: "patrocinador/patrocinadorList.html",
       controller: "ListPatrocinadorController",
       resolve:{
            patrocinadors:['patrocinadorRR',function(patrocinadorRR) {
                return patrocinadorRR.list();
            }]
       }
     });
}]);
