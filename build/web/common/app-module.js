var app = angular.module("app",
        ["ngRoute", "ui.select", "ui.bootstrap", "angular-confirm", "ngAnimate",
            "ngSanitize", "xeditable", "oitozero.ngSweetAlert", "flow", 'ui.checkbox']);

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {
        /*Sólo ruta por defecto*/
        $locationProvider.hashPrefix("");
        $routeProvider.when('/', {
            templateUrl: "main.html",
            controller: "MainController"
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $routeProvider.when('/subirArchivo', {
            templateUrl: 'general/subirArchivo.html',
            controller: "subirController",
            resolve: {
                investigacions: ['investigacionRemoteResource', function (investigacionRemoteResource) {
                        return investigacionRemoteResource.list();
                    }]
            }
        });
    }]);

