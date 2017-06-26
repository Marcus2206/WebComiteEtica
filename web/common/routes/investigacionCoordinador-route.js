var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
  
    $routeProvider.when('/investigacionCoordinadorEdit/:idInvestigacion/:idCoordinador', {
        templateUrl: "investigacionCoordinador/investigacionCoordinadorEdit.html",
        controller: "EditInvestigacionCoordinadorController",
        resolve: {
          investigacionCoordinador:['investigacionCoordinadorRemoteResource','$route',function(investigacionCoordinadorRemoteResource,$route) {
            var id={
                    idInvestigacion:$route.current.params.idCoordinador,
                    idCoordinador:$route.current.params.idCoordinador
            };
            return investigacionCoordinadorRemoteResource.get(id);
          }]
        }
    });
    
    $routeProvider.when('/investigacionCoordinadorNew', {
        templateUrl: "investigacionCoordinador/investigacionCoordinadorEdit.html",
        controller: "NewInvestigacionCoordinadorController"
    });

    $routeProvider.when('/investigacionCoordinadorList', {
       templateUrl: "investigacionCoordinador/investigacionCoordinadorList.html",
       controller: "ListInvestigacionCoordinadorController",
       resolve:{
            investigacionCoordinadors:['investigacionCoordinadorRemoteResource',function(investigacionCoordinadorRemoteResource) {
                return investigacionCoordinadorRemoteResource.list();
            }]
       }
     });
}]);
