var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");

        $routeProvider.when('/correspondenciaList/:idNotificacionParam', {
            templateUrl: "correspondencia/correspondenciaList.html",
            controller: "ListCorrespondenciaController",
            resolve: {
                idNotificacionParam: ['$route', function ($route) {
                        return  $route.current.params.idNotificacionParam;
                    }],
                correspondencias: ['correspondenciaRR', function (correspondenciaRR) {
                        return correspondenciaRR.listFindAll();
                    }]
            }
        });
    }]);

