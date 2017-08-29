/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("app");

app.controller("MainController",
        ['$scope', '$log', "$rootScope", "auth", "$q", "SweetAlert",
            "localStorageService", "$timeout", "notificacionRR", "UrlOrigen", "baseUrl",
            function ($scope, $log, $rootScope, auth, $q, SweetAlert,
                    localStorageService, $timeout, notificacionRR, UrlOrigen, baseUrl) {

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
//                    window.location.reload();
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
                                var i = $scope.notificacions.indexOf(not);
                                if (i !== -1) {
                                    if (not.estadoNotificacion === 1) {
                                        $scope.notificacions[i].estadoNotificacion = 0;
                                    } else {
                                        $scope.notificacions[i].estadoNotificacion = 1;
                                    }
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

                $scope.enlaceNotificacion = function (not) {
                    switch (not.tablaProcedencia) {
                        case 'Correspondencia':
                            window.open(UrlOrigen + '#/correspondenciaList/' + not.idDocumento, '_self', false);
                            break;
                        case 'Registro':
                            window.open(UrlOrigen + '#/registroList/' + not.idDocumento, '_self', false);
                            break;
                        case 'Pago':
                            window.open(UrlOrigen + '#/pagoList/' + not.idDocumento, '_self', false);
                            break;
                    }
                };

                $scope.autenticar = {usuario: '', password: ''};

                $scope.jSecurity = function () {
                    var sequence = $q.defer();
                    sequence.resolve();
                    sequence = sequence.promise;
                    
                    var links = [
                        {
                            link: UrlOrigen + '/j_security_check?j_username=' + $scope.autenticar.usuario + '&j_password=' + $scope.autenticar.password
                        },
                        {
                            link: baseUrl + '/j_security_check?j_username=' + $scope.autenticar.usuario + '&j_password=' + $scope.autenticar.password
                        },
                        {
                            link: UrlOrigen
                        }
                    ];

                    var wnd = window.open(links[0].link);
                    setTimeout(function () {
                        wnd.close();
                    }, 0);

                    var wnd1 = window.open(links[1].link);
                    setTimeout(function () {
                        wnd1.close();
                    }, 400);

                    setTimeout(function () {
                        auth.login($scope, $scope.autenticar.usuario, $scope.autenticar.password, SweetAlert);
                    }, 800);
                };


                $scope.noLeidos;
                $scope.setNoLeidos = function () {
                    function filterByEstadoNotificacion(obj) {
                        if (obj.estadoNotificacion === '0') {
                            return obj;
                        }
                    }
                    if (localStorageService.get("usuario") !== null) {
                        if (localStorageService.get("usuario") !== "") {
                            $scope.noLeidos = $scope.notificacions.filter(filterByEstadoNotificacion).length;
                        }
                    }
                };

            }]);
