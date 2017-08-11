var app = angular.module("app");

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {

        /*Ruta referente a Investigación*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/usuarioList', {
            templateUrl: "usuario/usuarioList.html",
            controller: "ListUsuarioController",
            resolve: {
                usuarios: ['usuarioRR', function (usuarioRR) {
                        return usuarioRR.list();
                    }]
            }
        });
    }]);