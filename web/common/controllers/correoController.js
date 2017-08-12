var app = angular.module("app");

app.controller("NewCorreoController",
        ['$scope', 'usuarioRR', "$log", "$uibModalInstance", "parametros",
            'SweetAlert',
            function ($scope, usuarioRR, $log, $uibModalInstance, parametros,
                    SweetAlert) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramPerfil = $scope.filtrar($scope.parametros, 'P010')[0].parametroDetalles;

                /*Se construyer el json*/
                $scope.usuario = {};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.usuario.usuarioIngresa = "user1";
                    $scope.usuario.fechaIngreso = new Date();
                    usuarioRR.insert($scope.usuario)
                            .then(function (usuarioResult) {

                                function isEmptyJSON(s) {
                                    for (var i in s) {
                                        return false;
                                    }
                                    return true;
                                }
                                $log.log(usuarioResult);
                                if (!isEmptyJSON(usuarioResult)) {
                                                            
                                    var listbox = document.getElementById("perfil");
                                    var selIndex = listbox.selectedIndex;
                                    var selText = listbox.options[selIndex].text;
                                    usuarioResult.perfil = selText;
                                    $uibModalInstance.dismiss(usuarioResult);
                                     SweetAlert.swal("Hecho", "Registro guardado exitosamente.", "success");
                                }else{
                                    SweetAlert.swal("No es posible registrar", "El usuario ya existe.", "warning");
                                }
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);


app.controller("ListCorreoController",
        ['$scope', "correos", "correoRR", "$log", "$location",
            "$uibModal", 'SweetAlert',
            function ($scope, correos, correoRR, $log, $location,
                    $uibModal, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.correos = correos;
                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.correos.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (correo) {
                    //Se prepara confirm
                    SweetAlert.swal({
                        title: '¿Está seguro de eliminar este registro?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: "Si",
                        cancelButtonText: "No",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    }, function (isConfirm) {
                        if (isConfirm) {
                            //Si se presiona Sí.
                            correoRR.delete(correo)
                                    .then(function (correoResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.correos.splice($scope.correos.indexOf(correo), 1);
                                        SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        //$scope.bussinessMessages = bussinessMessages;
                                        SweetAlert.swal("Advertencia", "La Sede esta asociada a una investigación activa.", "warning");

                                    });
                        } else {

                        }
                    });
                };

                /*Editar un registro*/
                $scope.editarModal = function (usuarioObj) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'usuario/usuarioEdit.html',
                        controller: "EditUsuarioController",
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            usuario: function () {
                                return correoRR.get(usuarioObj.idUsuario);
                            },
                            parametros: ['parametroRR', function (parametroRR) {
                                    return parametroRR.list();
                                }]
                        }
                    });

                    modalInstance.result.then(function () {
                        //Si no se devuelve nada
                    }, function (data) {
                        //Si devuelve un objeto
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
                                    //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                                    var index = $scope.correos.indexOf(usuarioObj);
                                    if (index !== -1) {
                                        $scope.correos[index] = data;
                                    }
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };

                /*Ingresar un registro*/
                $scope.insertarModal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'usuario/usuarioEdit.html',
                        controller: "NewUsuarioController",
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            parametros: ['parametroRR', function (parametroRR) {
                                    return parametroRR.list();
                                }]
                        }
                    });

                    modalInstance.result.then(function () {
                        //Si no devuelve nada.
                    }, function (data) {
                        //Si devuelve algo
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
//                                    $log.log(data);
                                    /*añade a la lista sin recargar la página*/
                                    $log.log(data);
                                    $scope.correos.push(data);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditCorreoController",
        ['$scope', "usuario", 'usuarioRR', "parametros",
            "$uibModalInstance", 'SweetAlert', "$log",
            function ($scope, usuario, usuarioRR, parametros,
                    $uibModalInstance, SweetAlert, $log) {
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramPerfil = $scope.filtrar($scope.parametros, 'P010')[0].parametroDetalles;

                $scope.usuario = usuario;
                $scope.usuario.password = '*******';
                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.usuario.usuarioModifica = "user1";
                    $scope.usuario.fechaModificacion = new Date();
                    usuarioRR.update($scope.usuario)
                            .then(function (sedeResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var listbox = document.getElementById("perfil");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                sedeResult.perfil = selText;

                                $uibModalInstance.dismiss(sedeResult);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cambiarPassword = function () {
                    $scope.usuario.usuarioModifica = "sa";
                    $scope.usuario.fechaModificacion = new Date();
                    usuarioRR.updatePassword($scope.usuario)
                            .then(function (usuarioResponse) {
                                SweetAlert.swal("Hecho!", "Se cambió exitosamente.", "success");
                            }, function (error) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                };

                $scope.cerrar = function () {
                    //Se devuelve cancel
                    $uibModalInstance.dismiss('cancel');
                };
            }]);