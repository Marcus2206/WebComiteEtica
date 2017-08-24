var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/pagoList/:idNotificacionParam', {
            templateUrl: "pago/pagoList.html",
            controller: "ListPagoController",
            resolve: {
                idNotificacionParam: ['$route', function ($route) {
                        return  $route.current.params.idNotificacionParam;
                    }],
                pagos: ['pagoRR', function (pagoRR) {
                        return pagoRR.listFindAll();
                    }]
            }
        });
    }]);

