var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/registroList/:idNotificacionParam', {
            templateUrl: "registro/registroList.html",
            controller: "ListRegistroController",
            resolve: {
                idNotificacionParam: ['$route', function ($route) {
                        return  $route.current.params.idNotificacionParam;
                    }],
                registros: ['registroRR', function (registroRR) {
                        return registroRR.listFindAll();
                    }]
            }
        });
    }]);

