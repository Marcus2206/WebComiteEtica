var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
  
    $routeProvider.when('/investigacionNew', {
        templateUrl: "investigacion/investigacionEdit.html",
        controller: "NewInvestigacionController",
        resolve: {
          parametros:['parametroRR',function(parametroRR) {
            return parametroRR.list();
          }]
        }
    });

    $routeProvider.when('/investigacionEdit/:idInvestigacion', {
        templateUrl: "investigacion/investigacionEdit.html",
        controller: "EditInvestigacionController",
        resolve: {
            investigacion:['investigacionRemoteResource','$route',function(investigacionRemoteResource,$route) {
                return investigacionRemoteResource.get($route.current.params.idInvestigacion);
            }],
            parametros:['parametroRR',function(parametroRR) {
                return parametroRR.list();
            }]
        }
    });
    $routeProvider.when('/investigacionList', {
       templateUrl: "investigacion/investigacionList.html",
       controller: "ListInvestigacionController",
       resolve:{
            investigacions:['investigacionRemoteResource',function(investigacionRemoteResource) {
                return investigacionRemoteResource.list();
            }]
       }
     });
}]);

