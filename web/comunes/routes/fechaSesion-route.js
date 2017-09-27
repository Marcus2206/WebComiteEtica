var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/fechaSesionList', {
            templateUrl: "fechaSesion/fechaSesionList.html",
            controller: "ListFechaSesionController",
            resolve: {
                fechaSesions: ['fechaSesionRR', function (fechaSesionRR) {
                        return fechaSesionRR.listAll();
                    }]
            }
        });
    }]);