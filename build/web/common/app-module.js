var app = angular.module("app",
        ["ngRoute", "ui.select", "ui.bootstrap", "angular-confirm", "ngAnimate",
            "ngSanitize", "xeditable", "oitozero.ngSweetAlert", "flow", 'ui.checkbox',
            'ngCookies']);



app.controller('loggedController', function ($scope, auth, $log, $cookies) {
    $scope.username;
    $scope.password;
    $scope.mostrar = true;
    $log.log("loggedController");
    $log.log($cookies.username);
    var cas = $cookies.username;
    $scope.$watch($cookies.username, function () {
        alert("cambió");
    });

    $scope.logout = function () {
        $log.log("cierra");
        auth.logout();
        window.location.reload();
        $scope.username = undefined;
        $scope.password = undefined;
        $scope.mostrar = true;
    };
});

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
                })
                .when('/subirArchivo', {
                    templateUrl: 'general/subirArchivo.html',
                    controller: "subirController",
                    resolve: {
                        investigacions: ['investigacionRemoteResource', function (investigacionRemoteResource) {
                                return investigacionRemoteResource.list();
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

