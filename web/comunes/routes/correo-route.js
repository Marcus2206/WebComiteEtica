var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/correoList', {
            templateUrl: "correo/correoList.html",
            controller: "ListCorreoController",
            resolve: {
                correos: ['correoRR', function (correoRR) {
                        return correoRR.list();
                    }]
            }
        });
    }]);