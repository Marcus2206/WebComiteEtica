/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("app");

app.controller("MainController",
        ['$scope', '$log', "$rootScope", "auth", "$q", "SweetAlert", 'usuarioRR',
            "localStorageService", "$timeout", "notificacionRR", "UrlOrigen", "baseUrl",
            function ($scope, $log, $rootScope, auth, $q, SweetAlert, usuarioRR,
                    localStorageService, $timeout, notificacionRR, UrlOrigen, baseUrl) {

//                $scope.patternCadenaValida=/^[a-zA-Z]*$/;
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
                /*Validar sesión activa*/
                $scope.contadorSession = 0;
                var setearNotificaciones = function () {
                    /*Cargar Notificaciones*/
                    notificacionRR.list($rootScope.username)
                            .then(function (notificacionResponse) {
                                if (typeof (notificacionResponse) !== 'string') {
                                    if ($scope.contadorSession === 3) {
                                        localStorageService.set("usuario", "");
                                        localStorageService.set("rolUsuario", "");
                                        localStorageService.set("mostrar", true);
                                    }
                                    $scope.notificacions = notificacionResponse;
                                    $scope.setNoLeidos();
                                    $scope.contadorSession = 0;

                                } else {
                                    $scope.contadorSession++;
                                }
                            }, function (error) {
                                $scope.contadorSession++;
                                if ($scope.contadorSession === 3) {
                                    localStorageService.set("usuario", "");
                                    localStorageService.set("rolUsuario", "");
                                    localStorageService.set("mostrar", true);
                                }
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
                        case 'Vencimiento':
                            window.open(UrlOrigen + '#/registroList/' + not.idDocumento, '_self', false);
                            break;
                        case 'Control Pago':
                            window.open(UrlOrigen + '#/pagoList/' + not.idDocumento, '_self', false);
                            break;
                    }
                };

                $scope.autenticar = {usuario: '', password: ''};

                $scope.jSecurity = function () {
                    var sequence = $q.defer();
                    sequence.resolve();
                    sequence = sequence.promise;

                    usuarioRR.getRestSession($scope.autenticar.usuario, $scope.autenticar.password)
                            .then(function (response) {
                                usuarioRR.getWebSession($scope.autenticar.usuario, $scope.autenticar.password)
                                        .then(function (response) {
                                            auth.login($scope, $scope.autenticar.usuario, $scope.autenticar.password, SweetAlert);
                                        }, function (error) {
                                        });
                            }, function (error) {
                            });

//                    var links = [
//                        {
//                            link: UrlOrigen + '/j_security_check?j_username=' + $scope.autenticar.usuario + '&j_password=' + $scope.autenticar.password
//                        },
//                        {
//                            link: baseUrl + '/j_security_check?j_username=' + $scope.autenticar.usuario + '&j_password=' + $scope.autenticar.password
//                        },
//                        {
//                            link: UrlOrigen
//                        }
//                    ];
//
//                    var wnd = window.open(links[0].link);
//                    setTimeout(function () {
//                        wnd.close();
//                    }, 250);
//
//                    var wnd1 = window.open(links[1].link);
//                    setTimeout(function () {
//                        wnd1.close();
//                    }, 500);
//
//                    setTimeout(function () {
//                        auth.login($scope, $scope.autenticar.usuario, $scope.autenticar.password, SweetAlert);
//                    }, 750);
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
