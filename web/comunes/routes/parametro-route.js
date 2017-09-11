var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/parametroList', {
            templateUrl: "parametro/parametroList.html",
            controller: "ListParametroController",
            resolve: {
                parametros: ['parametroRR', function (parametroRR) {
                        return parametroRR.listSql();
                    }]
            }
        });
    }]);