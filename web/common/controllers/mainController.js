/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("app");

app.controller("MainController",
        ['$scope', '$log', "$rootScope", "auth",
            "localStorageService", "$timeout", "notificacionRR",
            function ($scope, $log, $rootScope, auth,
                    localStorageService, $timeout, notificacionRR) {

                $scope.notificacions = [];
                /*Carousel*/
                $('#myCarousel').carousel({
                    interval: 2000
                });

                /*Validacion de nombre de login*/
                if (localStorageService.get("mostrar") !== null) {
                    $rootScope.muestra = localStorageService.get("mostrar");
                } else {
                    localStorageService.set("mostrar", true);
                    $rootScope.muestra = true;
                }

                if (localStorageService.get("rolUsuario") !== null) {
                    $rootScope.rolUsuario = localStorageService.get("rolUsuario");
                } else {
                    localStorageService.set("rolUsuario", "");
                    $rootScope.rolUsuario = "";
                }

                if (localStorageService.get("usuario") !== null) {
                    if (localStorageService.get("usuario") !== "") {
                        $rootScope.username = localStorageService.get("usuario");
                    }
                } else {
                    localStorageService.set("usuario", "");
                    $rootScope.username = "";
                }



//        $scope.user = $rootScope.username;
                $scope.logout = function () {
                    auth.logout();
//            $scope.user = "";
                    $rootScope.username = "";
                    $rootScope.muestra = true;
                    window.location.reload();
                };


                /*Notificaciones*/




                var setearNotificaciones = function () {
                    /*Cargar Notificaciones*/
                    notificacionRR.list($rootScope.username)
                            .then(function (notificacionResponse) {
                                $scope.notificacions = notificacionResponse;
                                $scope.setNoLeidos();
                            }
                            , function (error) {

                            });
                    $timeout(setearNotificaciones, 3000);
                };

                if (localStorageService.get("usuario") !== null) {
                    if (localStorageService.get("usuario") !== "") {
                        $timeout(setearNotificaciones, 3000);
                    }
                }

                $scope.marcar = function (not) {
                    not.usuario = $rootScope.username;
                    notificacionRR.updateSetLeido(not)
                            .then(function (notificacionResponse) {
                                if (not.estadoNotificacion === 1) {
                                    $scope.notificacions[$scope.notificacions.indexOf(not)].estadoNotificacion = 0;
                                } else {
                                    $scope.notificacions[$scope.notificacions.indexOf(not)].estadoNotificacion = 1;
                                }
                                $scope.setNoLeidos();
                            }
                            , function (error) {

                            });
                };

                $scope.marcarTodoLeido = function () {
                    var usuario = $rootScope.username;
                    notificacionRR.updateSetTodoLeido(usuario)
                            .then(function (notificacionResponse) {
                            }
                            , function (error) {
                            });
                };

                $scope.noLeidos;
                $scope.setNoLeidos = function () {
                    function filterByEstadoNotificacion(obj) {
                        if (obj.estadoNotificacion === '0') {
                            return obj;
                        }
                    }
                    $scope.noLeidos = $scope.notificacions.filter(filterByEstadoNotificacion).length;
                };

            }]);