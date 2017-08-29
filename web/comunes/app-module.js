var app = angular.module("app",
        ["ngRoute", "ui.select", "ui.bootstrap", "angular-confirm", "ngAnimate",
            "ngSanitize", "xeditable", "oitozero.ngSweetAlert", "flow", 'ui.checkbox',
            'LocalStorageModule', 'smart-table']);

app.config(['$routeProvider', "$locationProvider", function ($routeProvider, $locationProvider) {
        /*Sólo ruta por defecto*/
        $locationProvider.hashPrefix("");
        $routeProvider
                .when('/', {
                    templateUrl: "main.html",
                    controller: "MainController"
                })
                .when("/login", {
                    controller: "loginController",
                    templateUrl: "login.html"
//                    templateUrl: "login.jsp"
                })
                .when('/subirArchivo', {
                    templateUrl: 'general/subirArchivo.html',
                    controller: "subirController",
                    resolve: {
                        registros: ['registroRR', function (registroRR) {
                                return registroRR.listFindAll();
                            }]
                    }
                })
                .when('/myCarousel', {
//                    controller: "GlobalControllers",
                    templateUrl: "main.html"
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);
