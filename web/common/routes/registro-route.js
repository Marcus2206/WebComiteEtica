var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/registroList', {
       templateUrl: "registro/registroList.html",
       controller: "ListRegistroController",
       resolve:{
            registros:['registroRR',function(registroRR) {
                return registroRR.listFindAll();
            }]
       }
     });

    $routeProvider.when('/registroEdit/:idRegistro', {
        templateUrl: "registro/registroEdit.html",
        controller: "EditRegistroController",
        resolve: {
                registro:['registroRR','$route',function(registroRR,$route) {
                return registroRR.get($route.current.params.idRegistro);
            }]
        }
    });

    $routeProvider.when('/registroNew', {
        templateUrl: "registro/registroEdit.html",
        controller: "NewRegistroController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

