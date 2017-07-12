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

    $routeProvider.when('/patrocinadorEdit/:idPatrocinador', {
        templateUrl: "patrocinador/patrocinadorEdit.html",
        controller: "EditPatrocinadorController",
        resolve: {
                patrocinador:['patrocinadorRR','$route',function(patrocinadorRR,$route) {
                return patrocinadorRR.get($route.current.params.idPatrocinador);
            }]
        }
    });

    $routeProvider.when('/patrocinadorNew', {
        templateUrl: "patrocinador/patrocinadorEdit.html",
        controller: "NewPatrocinadorController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);
