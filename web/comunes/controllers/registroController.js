var app = angular.module("app");

app.controller("EditRegistroController",
        ['$scope', 'registro', 'parametros', 'registroRR', 'correspondenciasValidas',
            "$log", "$uibModalInstance", 'SweetAlert', 'opcion', 'Excel', '$timeout', '$q',
            '$uibModal', 'registroBitacoraRR', '$rootScope', 'fileRR', 'correspondenciaFileRR',
            function ($scope, registro, parametros, registroRR, correspondenciasValidas,
                    $log, $uibModalInstance, SweetAlert, opcion, Excel, $timeout, $q,
                    $uibModal, registroBitacoraRR, $rootScope, fileRR, correspondenciaFileRR) {

                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                var afterTomorrow = new Date();
                afterTomorrow.setDate(tomorrow.getDate() + 1);

                $scope.events = [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];
                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.open3 = function () {
                    $scope.popup3.opened = true;
                };

                $scope.popup3 = {
                    opened: false
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0);
                }

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(2007, 1, 1),
                    startingDay: 1,
                    showWeeks: false
                };

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.disabledExiste = true;
                $scope.opcion = opcion;
                $scope.parametros = parametros;
                $scope.paramEstado = $scope.filtrar($scope.parametros, 'P006')[0].parametroDetalles;
                $scope.paramNotificacion = $scope.filtrar($scope.parametros, 'P007')[0].parametroDetalles;
                $scope.paramEstadoRegistro = $scope.filtrar($scope.parametros, 'P012')[0].parametroDetalles;
                $scope.paramTipoBitacora = $scope.filtrar($scope.parametros, 'P013')[0].parametroDetalles;
                $scope.paramNivelDesviacion = $scope.filtrar($scope.parametros, 'P014')[0].parametroDetalles;

                $scope.registro = registro;

                $scope.deshabilitado = false;
                $scope.isBitacora = true;
                $scope.isCorrespondencia = true;

                $scope.registroBitacoras = [];

                registroBitacoraRR.findAllByIdRegistro($scope.registro.idRegistro)
                        .then(function (registroBitacoraResponse) {
                            $scope.registroBitacoras = registroBitacoraResponse;
                        }, function (bussinessMessages) {

                        });

                $scope.downloadFile = function (file) {
                    $scope.file = {_correspondenciaFile: {}};
                    $scope.file._correspondenciaFile.direccion = file.direccion;
                    $scope.file._correspondenciaFile.nombreArchivo = file.nombreArchivo;
                    fileRR.downloadFileFromURL($scope.file);
                };

                registroRR.validateRegistroEnCorrespondencia($scope.registro.idRegistro)
                        .then(function (response) {
                            if (parseInt(response) > 0) {
                                $scope.disabledExiste = true;
                            } else {
                                $scope.disabledExiste = false;
                            }

                        }, function (error) {

                        });
                $scope.guardar = function () {
                    $scope.registro.usuarioModifica = $rootScope.username;
                    if ($scope.registro.paramEstadoRegistro === null) {
                        SweetAlert.swal("Advertencia", "Debe seleccionar un Estado de Registro. \nEstudio Inicial / Nuevo Site.", "warning");
                        return;
                    }
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

                                registroRespond.nombreInvestigador = $scope.registro.investigador.apePaterno + ' ' + $scope.registro.investigador.apePaterno + ', ' + $scope.registro.investigador.nombres;
                                registroRespond.nombreSede = $scope.registro.sede.nombre;
                                registroRespond.protocolo = $scope.registro.investigacion.protocolo;
                                registroRespond.titulo = $scope.registro.investigacion.titulo;

                                var index = $scope.registros.indexOf($scope.registroObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(registroRespond, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.registros[index][key] = value;
                                        }
                                    });
                                }

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
                };

                $scope.buscarInvestigador = function () {
                    buscarInvestigador($scope, $uibModal);
                };

                $scope.buscarSede = function () {
                    buscarSede($scope, $uibModal);
                };

                $scope.registroBitacora = {id: {}};
                $scope.registroBitacora.id.idRegistro = $scope.registro.idRegistro;
                $scope.registroBitacora.id.idBitacora = 0;

                $scope.agregarBitacora = function () {
                    registroBitacoraRR.insert($scope.registroBitacora)
                            .then(function (registroBitacoraResponse) {

                                var listbox = document.getElementById("paramTipoBitacora");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                registroBitacoraResponse.paramTipoBitacora = selText;

                                var editText = document.getElementById("fecha");
                                $scope.registroBitacora = {id: {}};
                                $scope.registroBitacora.id.idRegistro = $scope.registro.idRegistro;
                                $scope.registroBitacora.id.idBitacora = 0;

                                var listbox1 = document.getElementById("paramDetalleBitacora");
                                var selIndex1 = listbox1.selectedIndex;
                                var selText1 = listbox1.options[selIndex1].text;
                                registroBitacoraResponse.paramDetalleBitacora = selText1;

                                var bit = {
                                    idRegistro: registroBitacoraResponse.id.idRegistro,
                                    idBitacora: registroBitacoraResponse.id.idBitacora,
                                    detalle: registroBitacoraResponse.detalle,
                                    fecha: editText.value,
                                    paramTipoBitacora: registroBitacoraResponse.paramTipoBitacora,
                                    paramDetalleBitacora: registroBitacoraResponse.paramDetalleBitacora
                                };

                                listbox.selectedIndex = -1;
                                $scope.paramDetalleBitacora = null;
                                $scope.registroBitacora.fecha = "";
                                $scope.registroBitacora.detalle = "";
                                $scope.registroBitacoras.push(bit);
                            }, function (bussinessMessages) {

                            });
                };

                $scope.eliminarBitacora = function (registroBitacora) {
                    registroBitacoraRR.delete(registroBitacora)
                            .then(function (registroBitacoraResponse) {
                                $scope.registroBitacoras.splice($scope.registroBitacoras.indexOf(registroBitacora), 1);
                            }, function (bussinessMessages) {

                            });
                };

                $scope.flagTipoBitacora = true;
                $scope.cargarDetalleBitacora = function () {
                    if ($scope.registroBitacora.paramTipoBitacora === 'PD05') {
                        $scope.flagTipoBitacora = false;
                        $scope.paramDetalleBitacora = $scope.paramNivelDesviacion;
                    } else if ($scope.registroBitacora.paramTipoBitacora === 'PD04') {
                        $scope.flagTipoBitacora = false;
                        $scope.paramDetalleBitacora = $scope.paramNotificacion;
                    } else {
                        $scope.paramDetalleBitacora = null;
                        $scope.flagTipoBitacora = true;
                    }
                };

                $scope.exportToExcel = function (tablaId, etiqueta) {
                    var tablaExport = document.getElementById(tablaId);
                    $scope.tablaExport = tablaExport;
                    $scope.exportHref = Excel.tableToExcel($scope.tablaExport, etiqueta);

                    var linkElement = document.createElement('a');
                    try {
                        linkElement.setAttribute('href', $scope.exportHref);
                        linkElement.setAttribute("download", etiqueta);
                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    } catch (ex) {
                    }
                };

                $scope.correspondenciasValidas = correspondenciasValidas;
                $scope.correspondenciasData = [];
                $scope.cargarCorrespondencias = function () {
                    var sequence = $q.defer();
                    sequence.resolve();
                    sequence = sequence.promise;
                    angular.forEach($scope.correspondenciasValidas, function (item, key) {
                        sequence = sequence.then(function () {
                            var pushCorrespondencia = item;
//                            pushCorrespondencia.idCorrespondencia = item.idCorrespondencia;
                            return correspondenciaFileRR.findAllByIdCorrepondencia(item.idCorrespondencia)
                                    .then(function (response) {
                                        pushCorrespondencia.pushCorrespondenciaFiles = response;
                                        $scope.correspondenciasData.push(pushCorrespondencia);
                                    }, function (bussinessMessages) {
                                        $scope.bussinessMessages = bussinessMessages;
                                    });
                        });
                    });
                };
                $scope.cargarCorrespondencias();
                $log.log("$scope.correspondenciasData");
                $log.log($scope.correspondenciasData);
            }]);

app.controller("ListRegistroController",
        ['$scope', "registros", "idNotificacionParam", "registroRR", 'correspondenciaRR',
            "$log", "$uibModal", 'SweetAlert',
            function ($scope, registros, idNotificacionParam, registroRR, correspondenciaRR,
                    $log, $uibModal, SweetAlert) {

                if (idNotificacionParam !== "all") {
                    var bg = document.getElementById("buscaGlobal");
                    bg.value = idNotificacionParam;
                }
                /*Se obtiene lista de registros*/
                $scope.registros = registros;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idRegistro', descripcion: 'Id. Registro'},
                    {nombre: 'equivalenciaCorrelativo', descripcion: 'Equivalencia correlativo'},
                    {nombre: 'paramEstadoRegistro', descripcion: 'Estado Registro'},
                    {nombre: 'idInvestigacion', descripcion: 'Investigación'},
                    {nombre: 'idInvestigador', descripcion: 'Investigador'},
                    {nombre: 'idSede', descripcion: 'Sede'},
                    {nombre: 'fechaAprobacion', descripcion: 'Fecha aprobación'},
                    {nombre: 'paramEstado', descripcion: 'Estado'},
                    {nombre: 'observacion', descripcion: 'Observación'},
                    {nombre: 'farmacoExperimental', descripcion: 'Fármaco experimental'},
                    {nombre: 'placebo', descripcion: 'Placebo'},
                    {nombre: 'pacienteEas', descripcion: 'Paciente EAS'},
                    {nombre: 'easLocal', descripcion: 'EAS Local'},
                    {nombre: 'paramNotificacion', descripcion: 'Notificación'},
                    {nombre: 'fechaEas', descripcion: 'Fecha EAS'},
                    {nombre: 'visitaInspeccion', descripcion: 'Visita Inspección'},
                    {nombre: 'estudioNinos', descripcion: 'Estudio Niños'},
                    {nombre: 'visitaInspeccionIns', descripcion: 'Visita Inspección INS'}];

                $scope.displayCollection = [].concat($scope.registros);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
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
                $scope.editarModal = function (registroObj, opcion) {
                    $scope.registroObj = registroObj;
                    $scope.opcion = opcion;
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
                            correspondenciasValidas: function () {
                                return correspondenciaRR.getCorrespondenciasValidas(registroObj.idRegistro);
                            },
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
                                    $scope.registros.push(data);
                                    $scope.editarModal(data, false);
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
                            window.onkeydown = null;
                            window.onfocus = null;
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
            '$uibModal', '$rootScope',
            function ($scope, registroRR,
                    parametros, $log, $uibModalInstance, SweetAlert,
                    $uibModal, $rootScope) {

                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                var afterTomorrow = new Date();
                afterTomorrow.setDate(tomorrow.getDate() + 1);

                $scope.events = [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];
                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.open3 = function () {
                    $scope.popup3.opened = true;
                };

                $scope.popup3 = {
                    opened: false
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0);
                }

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(2007, 1, 1),
                    startingDay: 1,
                    showWeeks: false
                };
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.opcion = false;
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

                    if (typeof ($scope.registro.investigador) === 'undefined') {
                        SweetAlert.swal("Advertencia", "Debe seleccionar un investigador asignado.", "warning");
                        return;
                    }

                    if (typeof ($scope.registro.sede) === 'undefined') {
                        SweetAlert.swal("Advertencia", "Debe seleccionar una sede asignada.", "warning");
                        return;
                    }

                    registroRR.validateRegistro($scope.registro.investigacion.idInvestigacion, $scope.registro.investigador.idInvestigador, $scope.registro.sede.idSede)
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

                                                registroRespond.nombreInvestigador = $scope.registro.investigador.apePaterno + ' ' + $scope.registro.investigador.apePaterno + ', ' + $scope.registro.investigador.nombres;
                                                registroRespond.nombreSede = $scope.registro.sede.nombre;
                                                registroRespond.protocolo = $scope.registro.investigacion.protocolo;
                                                registroRespond.titulo = $scope.registro.investigacion.titulo;

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
                $scope.displayCollection = [].concat($scope.registros);

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 5;

                $scope.itemsByPage = 5;

                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.registros.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.registro = {};
                $scope.enviar = function (registro) {
                    $uibModalInstance.dismiss(registro);
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);

function buscarInvestigacion($scope, $uibModal) {

    var modalInstance = $uibModal.open({
        templateUrl: 'investigacion/investigacionSearch.html',
        controller: "SearchInvestigacionController",
        size: 'md',
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
                    $scope.registro.idInvestigador = undefined;
                    $scope.registro.investigador = undefined;
                    $scope.registro.idSede = undefined;
                    $scope.registro.sede = undefined;
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
                    $scope.registro.investigador = data[1];
                    $scope.registro.nombreInvestigador = data[1].apePaterno + ' ' + data[1].apeMaterno + ', ' + data[1].nombres;
                    $scope.registro.sede = undefined;
                    $scope.registro.nombreSede = undefined;
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
                    $scope.registro.sede = data;
                    $scope.registro.nombreSede = data.nombre;
                }
            }
        } else {
            //Si es cancel
        }
    });
}
