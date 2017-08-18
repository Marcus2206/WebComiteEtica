var app = angular.module("app");

app.controller("EditRegistroController",
        ['$scope', 'registro', 'parametros', 'registroRR',
            "$log", "$uibModalInstance", 'SweetAlert',
            '$uibModal', 'rObj', 'registroBitacoraRR','$rootScope',
            function ($scope, registro, parametros, registroRR,
                    $log, $uibModalInstance, SweetAlert,
                    $uibModal, rObj, registroBitacoraRR) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramEstado = $scope.filtrar($scope.parametros, 'P006')[0].parametroDetalles;
                $scope.paramNotificacion = $scope.filtrar($scope.parametros, 'P007')[0].parametroDetalles;
                $scope.paramEstadoRegistro = $scope.filtrar($scope.parametros, 'P012')[0].parametroDetalles;

                $scope.registro = registro;
                $scope.registro.investigador = rObj.idInvestigador;
                $scope.registro.sede = rObj.idSede;

                $scope.deshabilitado = false;
                $scope.isBitacora = true;

                $scope.registroBitacora = {id: {}};
                $scope.registroBitacoras = [];


                registroBitacoraRR.findAllByIdRegistro($scope.registro.idRegistro)
                        .then(function (registroBitacoraResponse) {
                            $scope.registroBitacoras = registroBitacoraResponse;
                        }, function (bussinessMessages) {

                        });
                $scope.guardar = function () {
                    $scope.registro.usuarioModifica = $rootScope.username;
                    var listbox = document.getElementById("paramEstadoRegistro");
                    var selIndex = listbox.selectedIndex;
                    if (selIndex < 0) {
                        SweetAlert.swal("Advertencia", "Debe seleccionar un Estado de Registro", "warning");
                        return;
                    }
                    $scope.registro.usuarioModifica = "sa";
                    $scope.registro.fechaModificacion = new Date();
                    registroRR.update($scope.registro)
                            .then(function (registroRespond) {

                                var listbox = document.getElementById("paramEstado");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                registroRespond.paramEstado = selText;

                                listbox = document.getElementById("paramNotificacion");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                registroRespond.paramNotificacion = selText;

                                listbox = document.getElementById("paramEstadoRegistro");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                registroRespond.paramEstadoRegistro = selText;

                                registroRespond.idInvestigador = $scope.registro.investigador;
                                registroRespond.idSede = $scope.registro.sede;
                                registroRespond.idInvestigacion = $scope.registro.investigacion.protocolo + ' - ' + $scope.registro.investigacion.titulo;

                                var index = $scope.registros.indexOf($scope.registroObj);
                                if (index !== -1) {
                                    $scope.registros[index] = registroRespond;
                                }
                                $scope.registroObj = registroRespond;
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.buscarInvestigacion = function () {
                    buscarInvestigacion($scope, $uibModal);
//                    $scope.registro.idInvestigador=null;
//                    $scope.registro.idSede=null;
                };

                $scope.buscarInvestigador = function () {
                    buscarInvestigador($scope, $uibModal);
                };

                $scope.buscarSede = function () {
                    buscarSede($scope, $uibModal);
                };

                $scope.agregarBitacora = function () {
                    $scope.registroBitacora.id.idRegistro = $scope.registro.idRegistro;
                    $scope.registroBitacora.id.idBitacora = 0;
                    registroBitacoraRR.insert($scope.registroBitacora)
                            .then(function (registroBitacoraResponse) {
                                $scope.registroBitacoras.push(registroBitacoraResponse);
                            }, function (bussinessMessages) {

                            });
                };

                $scope.eliminarBitacora = function (registroBitacora) {
                    registroBitacora.fecha = new Date();
                    registroBitacoraRR.delete(registroBitacora)
                            .then(function (registroBitacoraResponse) {
                                $scope.registroBitacoras.splice($scope.registroBitacoras.indexOf(registroBitacora), 1);
                            }, function (bussinessMessages) {

                            });
                };

            }]);

app.controller("ListRegistroController",
        ['$scope', "registros", "registroRR",
            "$log", "$uibModal", 'SweetAlert',
            function ($scope, registros, registroRR,
                    $log, $uibModal, SweetAlert) {

                /*Se obtiene lista de registros*/
                $scope.registros = registros;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.registros.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                /*Editar un registro*/
                $scope.editarModal = function (registroObj) {
                    $scope.registroObj = registroObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'registro/registroEdit.html',
                        controller: "EditRegistroController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            registro: function () {
                                return registroRR.get(registroObj.idRegistro);
                            },
                            parametros: ['parametroRR', function (parametroRR) {
                                    return parametroRR.list();
                                }],
                            rObj: registroObj
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
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };

                /*Crear un registro*/
                $scope.nuevoModal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'registro/registroEdit.html',
                        controller: "NewRegistroController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
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
                                    $scope.registros.push(data);
                                    $scope.editarModal(data);
                                }
                            }
                        } else {
                            //Si es cancel

                        }
                    });
                };

                $scope.eliminar = function (registro) {
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
                            registroRR.delete(registro)
                                    .then(function (registroResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.registros.splice($scope.registros.indexOf(registro), 1);
                                        SweetAlert.swal("¡Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "El registro se encuentra activo.", "warning");
                                        $scope.bussinessMessages = bussinessMessages;
                                    });
                        } else {

                        }
                    });

                };

            }]);

app.controller("NewRegistroController",
        ['$scope', 'registroRR',
            'parametros', "$log", "$uibModalInstance", 'SweetAlert',
            '$uibModal','$rootScope',
            function ($scope, registroRR,
                    parametros, $log, $uibModalInstance, SweetAlert,
                    $uibModal) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramEstado = $scope.filtrar($scope.parametros, 'P006')[0].parametroDetalles;
                $scope.paramNotificacion = $scope.filtrar($scope.parametros, 'P007')[0].parametroDetalles;
                $scope.paramEstadoRegistro = $scope.filtrar($scope.parametros, 'P012')[0].parametroDetalles;

                $scope.deshabilitado = true;
                $scope.isBitacora = true;

                /*Se construyer el json*/
                $scope.registro = {investigacion: {}};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.registro.usuarioIngresa = $rootScope.username;
                    $scope.registro.fechaIngreso = new Date();

                    if (isEmptyJSON($scope.registro.investigacion)) {
                        SweetAlert.swal("Advertencia", "Debe seleccionar una investigacion en curso.", "warning");
                        return;
                    }

                    if (typeof ($scope.registro.idInvestigador) === 'undefined') {
                        SweetAlert.swal("Advertencia", "Debe seleccionar un investigador asignado.", "warning");
                        return;
                    }

                    if (typeof ($scope.registro.idSede) === 'undefined') {
                        SweetAlert.swal("Advertencia", "Debe seleccionar una sede asignada.", "warning");
                        return;
                    }

                    registroRR.validateRegistro($scope.registro.investigacion.idInvestigacion, $scope.registro.idInvestigador, $scope.registro.idSede)
                            .then(function (responde) {
                                if (responde.length > 0) {
                                    SweetAlert.swal("Advertencia", "Existe un registro con datos existentes.\nVerifique Investigación, Investigador y Sede.", "warning");
                                } else {
                                    registroRR.insert($scope.registro)
                                            .then(function (registroRespond) {
                                                var listbox = document.getElementById("paramEstado");
                                                var selIndex = listbox.selectedIndex;
                                                var selText = listbox.options[selIndex].text;
                                                registroRespond.paramEstado = selText;

                                                listbox = document.getElementById("paramNotificacion");
                                                selIndex = listbox.selectedIndex;
                                                selText = listbox.options[selIndex].text;
                                                registroRespond.paramNotificacion = selText;

                                                registroRespond.idInvestigador = $scope.registro.investigador;
                                                registroRespond.idSede = $scope.registro.sede;
                                                registroRespond.idInvestigacion = $scope.registro.investigacion.protocolo + ' - ' + $scope.registro.investigacion.titulo;

                                                $uibModalInstance.dismiss(registroRespond);
                                                SweetAlert.swal("Hecho", "Registro guardado exitosamente.", "success");
                                            }, function (bussinessMessages) {
                                                $scope.bussinessMessages = bussinessMessages;
                                                SweetAlert.swal("Hubo un error", "Intente nuevamente o comuniquese con el administrador.", "warning");
                                            });
                                }
                            }
                            , function (response) {

                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.buscarInvestigacion = function () {
                    buscarInvestigacion($scope, $uibModal);
                };
                $scope.buscarInvestigador = function () {
                    buscarInvestigador($scope, $uibModal);
                };
                $scope.buscarSede = function () {
                    buscarSede($scope, $uibModal);
                };
            }]);

app.controller("SearchRegistroController",
        ['$scope',
            "$log", "$uibModalInstance", 'registros',
            function ($scope,
                    $log, $uibModalInstance, registros) {
                $scope.registros = registros;
                $scope.registro = {};
                $scope.enviar = function () {
                    $uibModalInstance.dismiss($scope.registro.selected);
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);

function buscarInvestigacion($scope, $uibModal) {

    var modalInstance = $uibModal.open({
        templateUrl: 'investigacion/investigacionSearch.html',
        controller: "SearchInvestigacionController",
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        resolve: {
            investigacions: ['investigacionRemoteResource', function (investigacionRemoteResource) {
                    return investigacionRemoteResource.list();
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
                    $scope.registro.investigacion = data;
                }
            }
        } else {
            //Si es cancel
        }
    });
}


function buscarInvestigador($scope, $uibModal) {
    var idInvestigacion = $scope.registro.investigacion.idInvestigacion;
    var modalInstance = $uibModal.open({
        templateUrl: 'investigacionInvestigador/investigacionInvestigadorSearch.html',
        controller: "SearchInvestigacionInvestigadorController",
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        resolve: {
            investigacionInvestigadors: ['investigacionInvestigadorRR', function (investigacionInvestigadorRR) {
                    return investigacionInvestigadorRR.listInvestigadorByIdInvestigacion(idInvestigacion);
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
                    $scope.registro.idInvestigador = data[0].id.idInvestigador;
                    $scope.registro.investigador = data[1].apePaterno + ' ' + data[1].apeMaterno + ', ' + data[1].nombres;
                }
            }
        } else {
            //Si es cancel
        }
    });
}


function buscarSede($scope, $uibModal) {
    var idInvestigacion = $scope.registro.investigacion.idInvestigacion;
    var modalInstance = $uibModal.open({
        templateUrl: 'investigacionSede/investigacionSedeSearch.html',
        controller: "SearchInvestigacionSedeController",
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        resolve: {
            investigacionSedes: ['investigacionSedeRR', function (investigacionSedeRR) {
                    return investigacionSedeRR.listSedeByIdInvestigacion(idInvestigacion);
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
                    $scope.registro.idSede = data.idSede;
                    $scope.registro.sede = data.nombre;
                }
            }
        } else {
            //Si es cancel
        }
    });
}
