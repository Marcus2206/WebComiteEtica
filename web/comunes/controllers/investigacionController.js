var app = angular.module("app");

app.controller("EditInvestigacionController",
        ['$scope', 'investigacion', 'parametros', 'investigacionRemoteResource',
            'coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource',
            'investigadorRR', 'investigacionInvestigadorRR',
            'sedeRR', 'investigacionSedeRR', 'opcion',
            "$log", "$uibModalInstance", 'SweetAlert',
            '$confirm', 'patrocinadorRR', 'croRR', '$rootScope',
            function ($scope, investigacion, parametros, investigacionRemoteResource,
                    coordinadorRemoteResource, investigacionCoordinadorRemoteResource,
                    investigadorRR, investigacionInvestigadorRR,
                    sedeRR, investigacionSedeRR, opcion,
                    $log, $uibModalInstance, SweetAlert,
                    $confirm, patrocinadorRR, croRR, $rootScope) {

                $scope.parametros = parametros;
                $scope.deshabilitado = false;
                $scope.opcion = opcion;
                $scope.investigacionCoordinadors = [];
                $scope.investigacionInvestigadors = [];
                $scope.investigacionSedes = [];

                $scope.nombreBoton = "Editar";

                $scope.coordinadorsSelectList = [];
                $scope.investigadorsSelectList = [];
                $scope.sedesSelectList = [];

                $scope.coordinadorSelect = {};
                $scope.investigadorSelect = {};
                $scope.sedeSelect = {};

                $scope.isCoordinador = true;
                $scope.isInvestigador = true;
                $scope.isSede = true;

                $scope.patrocinadors;
                $scope.patrocinadorSelected = {};

                $scope.cros;
                $scope.croSelected = {};

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.paramEspecialidad = $scope.filtrar($scope.parametros, 'P003')[0].parametroDetalles;
                $scope.paramFase = $scope.filtrar($scope.parametros, 'P005')[0].parametroDetalles;
                $scope.paramTipoInvestigacion = $scope.filtrar($scope.parametros, 'P004')[0].parametroDetalles;

                $scope.paramEspecialidadSelected = {};
                $scope.paramFaseSelected = {};
                $scope.paramTipoInvestigacionSelected = {};

                $scope.simbolos = [];
                $scope.simboloSelected = [];

                $scope.investigacion = investigacion;
                $scope.guardar = function () {
                    $scope.investigacion.usuarioModifica = $rootScope.username;
                    $scope.investigacion.fechaModificacion = new Date();
                    $scope.investigacion.protocolo=$scope.investigacion.protocolo.replace('"','').replace('"','');                    
                    $scope.investigacion.titulo=$scope.investigacion.titulo.replace('"','').replace('"','');  
                    validaSeleccionables($scope);
                    if (isEmptyJSON($scope.investigacion.patrocinador)) {
                        $scope.investigacion.patrocinador = null;
                    }
                    if (isEmptyJSON($scope.investigacion.cro)) {
                        $scope.investigacion.cro = null;
                    }
                    investigacionRemoteResource.update($scope.investigacion)
                            .then(function (investigacionRespond) {
                                cambioEtiquetas(investigacionRespond, $scope);

                                var index = $scope.investigacions.indexOf($scope.investigacionObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(investigacionRespond, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.investigacions[index][key] = value;
                                        }
                                    });
                                }
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                $uibModalInstance.dismiss('cancel');
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");

                            });
                };

                /*Coordinadores seleccionables*/
                coordinadorRemoteResource.listCoordinadorSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                        .then(function (coordinadorsRespond) {
                            $scope.coordinadorsSelectList = coordinadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Investigadores seleccionables*/
                investigadorRR.listInvestigadorSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                        .then(function (investigadorRespond) {
                            $scope.investigadorsSelectList = investigadorRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Sedes seleccionables*/
                sedeRR.listSedeSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                        .then(function (sedeRespond) {
                            $scope.sedesSelectList = sedeRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de Investigación con Coordinador*/
                investigacionCoordinadorRemoteResource.listCoordinadorByIdInvestigacion($scope.investigacion.idInvestigacion)
                        .then(function (coordinadorsRespond) {
                            $scope.investigacionCoordinadors = coordinadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de Investigación Investigador*/
                investigacionInvestigadorRR.listInvestigadorByIdInvestigacion($scope.investigacion.idInvestigacion)
                        .then(function (investigadorsRespond) {
                            $scope.investigacionInvestigadors = investigadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de Investigación Sede*/
                investigacionSedeRR.listSedeByIdInvestigacion($scope.investigacion.idInvestigacion)
                        .then(function (sedesRespond) {
                            $scope.investigacionSedes = sedesRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                investigacionRemoteResource.listSimbolo()
                        .then(function (simbolos) {
                            $scope.simbolos = simbolos;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                $scope.agregaSimbolo = function () {
                    var field = document.getElementById("titulo");
                    var position = 0;
                    position = doGetCaretPosition(field);
                    var str1 = $scope.investigacion.titulo.substring(0, position - 1);
                    var str2 = $scope.investigacion.titulo.substring(position, $scope.investigacion.titulo.length);
                    $scope.investigacion.titulo = str1 + ' ' + $scope.simboloSelected + ' ' + str2;
                };

                /*Agregar detalles*/
                /*Agregar Coordinador*/
                $scope.agregarCoordinador = function () {
                    $scope.investigacionCoordinador = {id: {idInvestigacion: "",
                            idCoordinador: ""},
                        observacion: "",
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()};

                    $scope.investigacionCoordinador.id.idInvestigacion = $scope.investigacion.idInvestigacion;
                    $scope.investigacionCoordinador.id.idCoordinador = $scope.coordinadorSelect.idCoordinador;
                    $scope.investigacionCoordinador.observacion = $scope.coordinadorSelect.observacion;
                    $scope.investigacionCoordinador.usuarioIngresa = $rootScope.username;
                    $scope.investigacionCoordinador.fechaIngreso = new Date();
                    investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
                            .then(function (invCoordRespond) {
                                var ic = $scope.investigacionCoordinador;
                                var c = $scope.coordinadorSelect;
                                var invCoordinador = [ic, c];

                                $scope.investigacionCoordinadors.push(invCoordinador);
                                $scope.coordinadorsSelectList.splice($scope.coordinadorsSelectList.indexOf($scope.coordinadorSelect), 1);
                                $scope.coordinadorSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Coordinador*/
                $scope.eliminarInvCoordinador = function (invCoordinador) {
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Coordinador"
                    },
                            {size: 'sm',
                                backdrop: 'static'}
                    )
                            .then(function () {
                                investigacionCoordinadorRemoteResource.delete(invCoordinador[0])
                                        .then(function (invCoordinadorRespond) {
                                            $scope.coordinadorsSelectList.push(invCoordinador[1]);
                                            $scope.investigacionCoordinadors.splice($scope.investigacionCoordinadors.indexOf(invCoordinador), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                /*Agregar Investigador*/
                $scope.agregarInvestigador = function () {
                    $scope.investigacionInvestigador = {id: {idInvestigacion: "",
                            idInvestigador: ""},
                        observacion: "",
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()};

                    $scope.investigacionInvestigador.id.idInvestigacion = $scope.investigacion.idInvestigacion;
                    $scope.investigacionInvestigador.id.idInvestigador = $scope.investigadorSelect.idInvestigador;
                    $scope.investigacionInvestigador.observacion = $scope.investigadorSelect.observacion;
                    $scope.investigacionInvestigador.usuarioIngresa = $rootScope.username;
                    $scope.investigacionInvestigador.fechaIngreso = new Date();
                    investigacionInvestigadorRR.insert($scope.investigacionInvestigador)
                            .then(function (invInvesRespond) {
                                var ii = $scope.investigacionInvestigador;
                                var i = $scope.investigadorSelect;
                                var invInvestigador = [ii, i];

                                $scope.investigacionInvestigadors.push(invInvestigador);
                                $scope.investigadorsSelectList.splice($scope.investigadorsSelectList.indexOf($scope.investigadorSelect), 1);
                                $scope.investigadorSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Investigador*/
                $scope.eliminarInvInvestigador = function (invInvestigador) {
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Investigador"
                    },
                            {size: 'sm',
                                backdrop: 'static'}
                    )
                            .then(function () {
                                investigacionInvestigadorRR.delete(invInvestigador[0])
                                        .then(function (invInvestigadorRespond) {
                                            $scope.investigadorsSelectList.push(invInvestigador[1]);
                                            $scope.investigacionInvestigadors.splice($scope.investigacionInvestigadors.indexOf(invInvestigador), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                /*Agregar Sede*/
                $scope.agregarSede = function () {
                    $scope.investigacionSede = {id: {idInvestigacion: "",
                            idSede: ""},
                        observacion: "",
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()};

                    $scope.investigacionSede.id.idInvestigacion = $scope.investigacion.idInvestigacion;
                    $scope.investigacionSede.id.idSede = $scope.sedeSelect.idSede;
                    $scope.investigacionSede.observacion = $scope.sedeSelect.observacion;
                    $scope.investigacionSede.usuarioIngresa = $rootScope.username;
                    $scope.investigacionSede.fechaIngreso = new Date();
                    investigacionSedeRR.insert($scope.investigacionSede)
                            .then(function (invSedeRespond) {
                                var ii = $scope.investigacionSede;
                                var i = $scope.sedeSelect;
                                var invSede = {idInvestigacion: $scope.investigacionSede.id.idInvestigacion,
                                    idSede: $scope.investigacionSede.id.idSede,
                                    nombre: $scope.sedeSelect.nombre,
                                    idDepartamento: $scope.sedeSelect.idDepartamento,
                                    idProvincia: $scope.sedeSelect.idProvincia,
                                    idDistrito: $scope.sedeSelect.idDistrito};

                                $scope.investigacionSedes.push(invSede);
                                $scope.sedesSelectList.splice($scope.sedesSelectList.indexOf($scope.sedeSelect), 1);
                                $scope.sedeSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Sede*/
                $scope.eliminarInvSede = function (invSede) {
                    var idSede = {id: {idInvestigacion: invSede.idInvestigacion,
                            idSede: invSede.idSede},
                        observacion: ""
                    };
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Sede",
                        settings: "{size: 'sm'}"
                    })
                            .then(function () {
                                investigacionSedeRR.delete(idSede)
                                        .then(function (invInvestigadorRespond) {
                                            var sedeSelect = {idSede: invSede.idSede,
                                                nombre: invSede.nombre,
                                                idDepartamento: invSede.idDepartamento,
                                                idProvincia: invSede.idProvincia,
                                                idDistrito: invSede.idDistrito};
                                            $scope.sedesSelectList.push(sedeSelect);
                                            $scope.investigacionSedes.splice($scope.investigacionSedes.indexOf(invSede), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cerrarOtras = true;

                cargarPatrocinador(patrocinadorRR, $scope);

                $scope.cargarCro = function () {
                    cargarCro(croRR, $scope);
                    $scope.croSelected = {};
                };

                $scope.setearCro = function () {
                    setearCro($scope);
                };

                $scope.filtrarDetalle = function (obj, param) {
                    function filterByParametroDetalle(obj) {
                        if (obj.id.idParametroDetalle === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametroDetalle);
                };

                $scope.inicial = function () {
                    if ($scope.investigacion.patrocinador !== null) {
                        $scope.patrocinadorSelected.selected = $scope.investigacion.patrocinador;
                        $scope.cargarCro();
                        if ($scope.investigacion.cro !== null) {
                            $scope.croSelected.selected = $scope.investigacion.cro;
                        } else {
                            $scope.investigacion.cro = {};
                        }
                    } else {
                        $scope.investigacion.patrocinador = {};

                    }
                    $scope.paramEspecialidadSelected.selected = $scope.filtrarDetalle($scope.paramEspecialidad, $scope.investigacion.paramEspecialidad)[0];
                    $scope.paramTipoInvestigacionSelected.selected = $scope.filtrarDetalle($scope.paramTipoInvestigacion, $scope.investigacion.paramTipoInvestigacion)[0];
                    $scope.paramFaseSelected.selected = $scope.filtrarDetalle($scope.paramFase, $scope.investigacion.paramFase)[0];
                };
                $scope.inicial();
            }]);

app.controller("ListInvestigacionController",
        ['$scope', "investigacions", "investigacionRemoteResource", 'Excel',
            "$log", "$uibModal", 'SweetAlert',
            function ($scope, investigacions, investigacionRemoteResource, Excel,
                    $log, $uibModal, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.investigacions = investigacions;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idInvestigacion', descripcion: 'Código'},
                    {nombre: 'protocolo', descripcion: 'Protocolo'},
                    {nombre: 'titulo', descripcion: 'Titulo'},
                    {nombre: 'paramEspecialidad', descripcion: 'Especialidad'},
                    {nombre: 'paramFase', descripcion: 'Fase'},
                    {nombre: 'paramTipoInvestigacion', descripcion: 'Tipo de Investigación'}];

                $scope.displayCollection = [].concat($scope.investigacions);
                $scope.displayCollection1 = [];
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.investigacions.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                /*Editar un registro*/
                $scope.editarModal = function (investigacionObj, opcion) {
                    $scope.investigacionObj = investigacionObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'investigacion/investigacionEdit.html',
                        controller: "EditInvestigacionController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            investigacion: function () {
                                return investigacionRemoteResource.get(investigacionObj.idInvestigacion);
                            },
                            parametros: ['parametroRR', function (parametroRR) {
                                    return parametroRR.list();
                                }],
                            opcion: opcion
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
                $scope.insertarModal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'investigacion/investigacionEdit.html',
                        controller: "NewInvestigacionController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            parametros: ['parametroRR', function (parametroRR) {
                                    return parametroRR.list();
                                }],
                            opcion: false
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
                                    $scope.investigacions.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };

                $scope.eliminar = function (investigacion) {
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
                            window.onkeydown = null;
                            window.onfocus = null;
                            //Si se presiona Sí.
                            investigacionRemoteResource.delete(investigacion)
                                    .then(function (investigacionResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.investigacions.splice($scope.investigacions.indexOf(investigacion), 1);
                                        SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "La investigación se encuentra activa.", "warning");
                                        //$scope.bussinessMessages = bussinessMessages;
                                    });
                        } else {

                        }
                    });

                };

            }]);

app.controller("NewInvestigacionController",
        ['$scope', 'investigacionRemoteResource', 'opcion',
            'parametros', "$log", "$uibModalInstance", 'SweetAlert', 'patrocinadorRR', 'croRR', '$rootScope',
            function ($scope, investigacionRemoteResource, opcion,
                    parametros, $log, $uibModalInstance, SweetAlert, patrocinadorRR, croRR, $rootScope) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.isCoordinador = true;
                $scope.isInvestigador = true;
                $scope.isSede = true;

                $scope.opcion = opcion;
                $scope.deshabilitado = true;

                $scope.parametros = parametros;
                $scope.paramEspecialidad = $scope.filtrar($scope.parametros, 'P003')[0].parametroDetalles;
                $scope.paramFase = $scope.filtrar($scope.parametros, 'P005')[0].parametroDetalles;
                $scope.paramTipoInvestigacion = $scope.filtrar($scope.parametros, 'P004')[0].parametroDetalles;

                $scope.patrocinadors;
                $scope.patrocinadorSelected = {};

                $scope.cros;
                $scope.croSelected = {};

                $scope.paramEspecialidadSelected = {};
                $scope.paramFaseSelected = {};
                $scope.paramTipoInvestigacionSelected = {};

                /*Se construyer el json*/
                $scope.investigacion = {patrocinador: {},
                    cro: {}};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.investigacion.usuarioIngresa = $rootScope.username;
                    $scope.investigacion.fechaIngreso = new Date();
                    $scope.investigacion.protocolo=$scope.investigacion.protocolo.replace('"','').replace('"','');                    
                    $scope.investigacion.titulo=$scope.investigacion.titulo.replace('"','').replace('"','');  
                    validaSeleccionables($scope, $log);
                    if (isEmptyJSON($scope.investigacion.patrocinador)) {
                        $scope.investigacion.patrocinador = null;
                    }
                    if (isEmptyJSON($scope.investigacion.cro)) {
                        $scope.investigacion.cro = null;
                    }
                    investigacionRemoteResource.insert($scope.investigacion)
                            .then(function (investigacionRespond) {
                                cambioEtiquetas(investigacionRespond, $scope);
                                $uibModalInstance.dismiss(investigacionRespond);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                $uibModalInstance.dismiss('cancel');
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                cargarPatrocinador(patrocinadorRR, $scope);

                $scope.cargarCro = function () {
                    cargarCro(croRR, $scope);
                    $scope.croSelected = {};
                };

                $scope.setearCro = function () {
                    setearCro($scope);
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);

app.controller("SearchInvestigacionController",
        ['$scope',
            "$log", "$uibModalInstance", 'investigacions',
            function ($scope,
                    $log, $uibModalInstance, investigacions) {
                $scope.investigacions = investigacions;
                $scope.displayCollection = [].concat($scope.investigacions);

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 5;

                $scope.itemsByPage = 5;

                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.investigacions.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.investigacion = {};
                $scope.enviar = function (investigacion) {
                    $uibModalInstance.dismiss(investigacion);
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.test = function () {
                };
            }]);

function cargarPatrocinador(patrocinadorRR, $scope) {
    /*Patrocinador*/
    patrocinadorRR.list()
            .then(function (patrocinadorRespond) {
                $scope.patrocinadors = patrocinadorRespond;
            }, function (bussinessMessages) {
                $scope.bussinessMessages = bussinessMessages;
            });
}

function cargarCro(croRR, $scope) {
    /*Cro*/
    $scope.investigacion.patrocinador.idPatrocinador = $scope.patrocinadorSelected.selected.idPatrocinador;
    croRR.listCroByPatrocinador($scope.investigacion.patrocinador.idPatrocinador)
            .then(function (croRespond) {
                $scope.cros = croRespond;
            }, function (bussinessMessages) {
                $scope.bussinessMessages = bussinessMessages;
            });
}

function setearCro($scope) {
    $scope.investigacion.cro.idCro = $scope.croSelected.selected.idCro;
}

function cambioEtiquetas(investigacionRespond, $scope) {
    if (typeof ($scope.paramEspecialidadSelected.selected) !== 'undefined') {
        investigacionRespond.paramEspecialidad = $scope.paramEspecialidadSelected.selected.descripcion;
    }
    if (typeof ($scope.paramTipoInvestigacionSelected.selected) !== 'undefined') {
        investigacionRespond.paramTipoInvestigacion = $scope.paramTipoInvestigacionSelected.selected.descripcion;
    }
    if (typeof ($scope.paramFaseSelected.selected) !== 'undefined') {
        investigacionRespond.paramFase = $scope.paramFaseSelected.selected.descripcion;
    }
}

function validaSeleccionables($scope) {

    if (typeof ($scope.paramEspecialidadSelected.selected) !== 'undefined') {
        $scope.investigacion.paramEspecialidad = $scope.paramEspecialidadSelected.selected.id.idParametroDetalle;
    }

    if (typeof ($scope.paramTipoInvestigacionSelected.selected) !== 'undefined') {
        $scope.investigacion.paramTipoInvestigacion = $scope.paramTipoInvestigacionSelected.selected.id.idParametroDetalle;
    }

    if (typeof ($scope.paramFaseSelected.selected) !== 'undefined') {
        $scope.investigacion.paramFase = $scope.paramFaseSelected.selected.id.idParametroDetalle;
    }
}