var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
  
    $routeProvider.when('/investigacionCoordinadorRead', {
        templateUrl: "investigacion/investigacionRead.html",
        controller: "ReadInvestigacionCoordinadorController",
        resolve: {
          investigacionCoordinador:['investigacionRemoteResource',function(investigacionRemoteResource) {

            var data=   {
                            idInvestigacion:"INV1700001",
                            idCoordinador: "COD1700001"
                        };
            return investigacionRemoteResource.get(data);
          }]
        }
    });

}]);

