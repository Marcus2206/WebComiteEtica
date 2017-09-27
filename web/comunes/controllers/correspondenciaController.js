var app = angular.module("app");
app.controller("EditCorrespondenciaController",
        ['$scope', 'correspondencia', 'parametros', 'correspondenciaRR',
            'correspondenciaFileRR', 'fileRR', 'fechaSesionRR', 'opcion',
            "$log", "$uibModalInstance", 'SweetAlert', "$q", '$uibModal', 'correspondenciaServicioRR', "$rootScope",
            function ($scope, correspondencia, parametros, correspondenciaRR,
                    correspondenciaFileRR, fileRR, fechaSesionRR, opcion,
                    $log, $uibModalInstance, SweetAlert, $q, $uibModal, correspondenciaServicioRR, $rootScope) {

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
                $scope.buscarRegistro = function () {
                    buscarRegistro($scope, $uibModal);
                };
                $scope.deshabilitado = false;
                $scope.isCorrespondenciaFile = true;
                $scope.isServicio = true;
                $scope.parametros = parametros;
                $scope.correspondenciaFiles = [];
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };
                $scope.opcion = opcion;
                $scope.paramTipoServicio = $scope.filtrar($scope.parametros, 'P001')[0].parametroDetalles;
                $scope.paramDistribucion = $scope.filtrar($scope.parametros, 'P002')[0].parametroDetalles;
                $scope.servicioSelect = {};
                $scope.observacionSelect = "";
                $scope.servicioSelectList = $scope.paramTipoServicio;
                $scope.correspondencia = correspondencia;
                /*Cargando archivos de correspondencia*/
                correspondenciaFileRR.findAllByIdCorrepondencia($scope.correspondencia.idCorrespondencia)
                        .then(function (correspondenciaFileRespond) {
                            $scope.relacionarFile(correspondenciaFileRespond);
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                        });
                $scope.fechasSesion = {};
                $scope.fechasSesions;
                fechaSesionRR.listProx()
                        .then(function (fechaSesionresponse) {
                            $scope.fechasSesions = fechaSesionresponse;
                        }, function (response) {

                        });
                /*Detalle de Correspondencia con Servicio*/
                correspondenciaServicioRR.listServicioByCorrespondenciaFindAll($scope.correspondencia.idCorrespondencia)
                        .then(function (correspondenciaServiciosRespond) {
                            $scope.correspondenciaServicios = correspondenciaServiciosRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });
                $scope.agregarServicio = function () {
                    if (isEmptyJSON($scope.servicioSelect)) {
                        return;
                    }

                    $scope.correspondenciaServicio = {
                        id: {idCorrespondencia: $scope.correspondencia.idCorrespondencia,
                            idCorrespondenciaServicio: 0},
                        paramTipoServicio: $scope.servicioSelect.id.idParametroDetalle,
                        costo: $scope.servicioSelect.valor,
                        observacion: $scope.observacionSelect,
                        transferido: 0,
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()
                    };
                    correspondenciaServicioRR.insert($scope.correspondenciaServicio)
                            .then(function (correspondenciaServicioRespond) {
                                correspondenciaServicioRespond.idCorrespondencia = correspondenciaServicioRespond.id.idCorrespondencia;
                                correspondenciaServicioRespond.idCorrespondenciaServicio = correspondenciaServicioRespond.id.idCorrespondenciaServicio;
                                correspondenciaServicioRespond.paramTipoServicio = $scope.servicioSelect.descripcion;
                                $scope.correspondenciaServicios.push(correspondenciaServicioRespond);
                                $scope.observacionSelect = "";
                                $scope.servicioSelect = {};
                            }, function (bussinessMessages) {

                            });
                };
                $scope.eliminarServicio = function (correspondenciaServicio) {
                    correspondenciaServicioRR.delete(correspondenciaServicio)
                            .then(function (correspondenciaServicioRespond) {
                                if (correspondenciaServicioRespond === 1) {
                                    $scope.correspondenciaServicios.splice($scope.correspondenciaServicios.indexOf(correspondenciaServicio), 1);
                                    $scope.servicioSelect = {};
                                } else {
                                    SweetAlert.swal("No se puede eliminar", "Es posible que el servicio se encuentre listado en Pagos.", "warning");
                                }

                            }, function (bussinessMessages) {

                            });
                };
                $scope.guardar = function () {
                    $scope.correspondencia.usuarioModifica = $rootScope.username;
                    $scope.correspondencia.fechaModificacion = new Date();
                    correspondenciaRR.update($scope.correspondencia)
                            .then(function (correspondenciaRespond) {
                                var listbox = document.getElementById("paramDistribucion");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                correspondenciaRespond.paramDistribucion = selText;

                                var index = $scope.correspondencias.indexOf($scope.correspondenciaObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(correspondenciaRespond, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.correspondencias[index][key] = value;
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
                $scope.setFechaSesion = function () {
                    setFechaSesion($scope, $log);
                };
                $scope.myFile = [];
                $scope.progressBar = 0;
                $scope.downloadFile = function (file) {
                    fileRR.downloadFileFromURL(file);
                };
                $scope.uploadFile = function () {
                    var sequence = $q.defer();
                    sequence.resolve();
                    sequence = sequence.promise;
                    angular.forEach($scope.myFile, function (item, key) {
                        sequence = sequence.then(function () {
                            return fileRR.uploadFileToUrl(item, $scope.correspondencia.idCorrespondencia)
                                    .then(function (response) {
                                        var fileReturned = response.data;
                                        var newCorrespondenciaFile = {
                                            id: {
                                                idCorrespondencia: $scope.correspondencia.idCorrespondencia,
                                                fileDetalle: 0
                                            },
                                            nombreArchivo: fileReturned.nombreArchivo,
                                            direccion: fileReturned.direccion,
                                            usuarioIngresa: $rootScope.username,
                                            fechaIngreso: new Date()
                                        };
                                        return correspondenciaFileRR.insert(newCorrespondenciaFile)
                                                .then(function (response) {
                                                    if (key !== -1) {
                                                        $scope.myFile[key]._correspondenciaFile = response;
                                                    }

                                                }, function (response) {
                                                });
                                    }, function (bussinessMessages) {
                                        $scope.bussinessMessages = bussinessMessages;
                                    });
                        });
                    });
                };
                $scope.relacionarFile = function (correspondenciaFile) {
                    var cFile = correspondenciaFile;
                    angular.forEach(cFile, function (item) {
                        var newMyFile = {
                            name: item.nombreArchivo,
                            _file: undefined,
                            _progress: 100,
                            _progressType: 'success',
                            _correspondenciaFile: item
                        };
                        $scope.myFile.push(newMyFile);
                    });
                };
                $scope.eliminarFile = function (file) {
                    fileRR.deleteFileFromURL(file)
                            .then(function (response) {
                                correspondenciaFileRR.delete(file._correspondenciaFile)
                                        .then(function (response) {
                                        }
                                        , function (response) {
                                        });
                                $scope.myFile.splice($scope.myFile.indexOf(file), 1);
                            }, function (response) {
                            });
                };
                $scope.eliminarTodo = function () {
                    fileRR.deleteAllFileFromURL($scope.correspondencia.idCorrespondencia)
                            .then(function (response) {
                                correspondenciaFileRR.deleteCarpeta($scope.correspondencia.idCorrespondencia)
                                        .then(function (response) {
                                        }
                                        , function (response) {
                                        });
                                $scope.myFile.splice(0, $scope.myFile.length);
                            }, function (response) {
                            });
                };

                $scope.generarHojaRuta = function () {
                    fileRR.setHojaRuta($scope.correspondencia)
                            .then(function (rutaResponse) {
                                var newMyFile = {
                                    name: rutaResponse.nombreArchivo,
                                    _file: undefined,
                                    _progress: 100,
                                    _progressType: 'success',
                                    _correspondenciaFile: rutaResponse
                                };
                                $scope.myFile.push(newMyFile);
                                SweetAlert.swal("¡Hecho!", "Se generó la Hoja de Ruta.\nPuede verla en los archivos adjuntos", "success");
                            }, function (error) {
                                SweetAlert.swal("¡Advertencia!", "Ocurrió un inconveniente.", "warning");
                            });
                };
                
                $scope.generarCartaArpobacion = function () {
                    fileRR.setCartaAprobacion($scope.correspondencia)
                            .then(function (rutaResponse) {
//                                $scope.myFile=[];
//                                correspondenciaFileRR.findAllByIdCorrepondencia($scope.correspondencia.idCorrespondencia)
//                                        .then(function (correspondenciaFileRespond) {
//                                            $scope.relacionarFile(correspondenciaFileRespond);
//                                        }, function (bussinessMessages) {
//                                            $scope.bussinessMessages = bussinessMessages;
//                                        });
                                var newMyFile = {
                                    name: rutaResponse.nombreArchivo,
                                    _file: undefined,
                                    _progress: 100,
                                    _progressType: 'success',
                                    _correspondenciaFile: rutaResponse
                                };
                                $scope.myFile.push(newMyFile);
                                SweetAlert.swal("¡Hecho!", "Se generó la Hoja de Ruta.\nPuede verla en los archivos adjuntos", "success");
                            }, function (error) {
                                SweetAlert.swal("¡Advertencia!", "Ocurrió un inconveniente.", "warning");
                            });
                };
                
                $scope.generarCartaObservacion = function () {
                    fileRR.setCartaObservacion($scope.correspondencia)
                            .then(function (rutaResponse) {
//                                $scope.myFile=[];
//                                correspondenciaFileRR.findAllByIdCorrepondencia($scope.correspondencia.idCorrespondencia)
//                                        .then(function (correspondenciaFileRespond) {
//                                            $scope.relacionarFile(correspondenciaFileRespond);
//                                        }, function (bussinessMessages) {
//                                            $scope.bussinessMessages = bussinessMessages;
//                                        });
                                var newMyFile = {
                                    name: rutaResponse.nombreArchivo,
                                    _file: undefined,
                                    _progress: 100,
                                    _progressType: 'success',
                                    _correspondenciaFile: rutaResponse
                                };
                                $scope.myFile.push(newMyFile);
                                SweetAlert.swal("¡Hecho!", "Se generó la Hoja de Ruta.\nPuede verla en los archivos adjuntos", "success");
                            }, function (error) {
                                SweetAlert.swal("¡Advertencia!", "Ocurrió un inconveniente.", "warning");
                            });
                };
                
            }]);
app.controller("ListCorrespondenciaController",
        ['$scope', "correspondencias", "idNotificacionParam", "correspondenciaRR",
            "$log", "$uibModal", 'SweetAlert', "UrlOrigen", "localStorageService",
            function ($scope, correspondencias, idNotificacionParam, correspondenciaRR,
                    $log, $uibModal, SweetAlert, UrlOrigen, localStorageService) {

                if (idNotificacionParam !== "all") {
                    var bg = document.getElementById("buscaGlobal");
                    bg.value = idNotificacionParam;
                }

                /*Se obtiene lista de correspondencias*/
                $scope.correspondencias = correspondencias;
                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idCorrespondencia', descripcion: 'Código'},
                    {nombre: 'fechaCorrespondencia', descripcion: 'Fecha Correspondencia'},
                    {nombre: 'fechaCarta', descripcion: 'Fecha Carta'},
                    {nombre: 'idRegistro', descripcion: 'Registro'},
                    {nombre: 'equivalenciaCorrelativo', descripcion: 'Correlativo equiv.'},
                    {nombre: 'paramTipoServicio', descripcion: 'Tipo de Servicio'},
                    {nombre: 'paramDistribucion', descripcion: 'Distribución'},
                    {nombre: 'otro', descripcion: 'Comentario'},
                    {nombre: 'fechaSesion', descripcion: 'Fecha Sesión'},
                    {nombre: 'enviarCorreo', descripcion: 'Enviar Correo'},
                    {nombre: 'enviado', descripcion: 'Estado Envío'}];
                $scope.displayCollection = [].concat($scope.correspondencias);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;
                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.correspondencias.length / $scope.pageSize);
                };
                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };
                /*Editar un registro*/
                $scope.editarModal = function (correspondenciaObj, opcion) {
                    $scope.correspondenciaObj = correspondenciaObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'correspondencia/correspondenciaEdit.html',
                        controller: "EditCorrespondenciaController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            correspondencia: function () {
                                return correspondenciaRR.get(correspondenciaObj.idCorrespondencia);
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
                $scope.nuevoModal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'correspondencia/correspondenciaEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                        controller: "NewCorrespondenciaController",
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
                                    $scope.correspondencias.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
                $scope.eliminar = function (correspondencia) {
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
                            correspondencia.enviarCorreo = ((correspondencia.enviarCorreo === '1') ? 1 : 0);
                            correspondencia.enviado = ((correspondencia.enviado === '1') ? 1 : 0);
                            correspondenciaRR.delete(correspondencia)
                                    .then(function (correspondenciaResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.correspondencias.splice($scope.correspondencias.indexOf(correspondencia), 1);
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
app.controller("NewCorrespondenciaController",
        ['$scope', 'correspondenciaRR', 'fechaSesionRR', 'opcion',
            'parametros', "$log", "$uibModalInstance", 'SweetAlert', '$uibModal', "$rootScope",
            function ($scope, correspondenciaRR, fechaSesionRR, opcion,
                    parametros, $log, $uibModalInstance, SweetAlert, $uibModal, $rootScope) {

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
                $scope.parametros = parametros;
                $scope.deshabilitado = true;
                $scope.isCorrespondenciaFile = true;
                $scope.fechasSesion = {};
                $scope.fechasSesions;
                fechaSesionRR.listProx()
                        .then(function (fechaSesionresponse) {
                            $scope.fechasSesions = fechaSesionresponse;
                        }, function (response) {

                        });
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };
                $scope.opcion = opcion;
                $scope.paramTipoServicio = $scope.filtrar($scope.parametros, 'P001')[0].parametroDetalles;
                $scope.paramDistribucion = $scope.filtrar($scope.parametros, 'P002')[0].parametroDetalles;
                $scope.isServicio = true;
                $scope.servicioSelect = {};
                $scope.servicioSelectList = $scope.paramTipoServicio;
                /*Se construyer el json*/
                $scope.correspondencia = {
                    registro: {},
                    fechaCorrespondencia: new Date()
                };
                $scope.buscarRegistro = function () {
                    buscarRegistro($scope, $uibModal);
                };
                $scope.guardar = function () {
                    $scope.correspondencia.usuarioIngresa = $rootScope.username;
                    $scope.correspondencia.fechaIngreso = new Date();
                    if (isEmptyJSON($scope.correspondencia.registro)) {
                        SweetAlert.swal("Adventencia", "La correspondencia debe contar con un registro asignado.", "warning");
                        return;
                    }
                    correspondenciaRR.insert($scope.correspondencia)
                            .then(function (correspondenciaRespond) {
                                var listbox = document.getElementById("paramDistribucion");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                correspondenciaRespond.paramDistribucion = selText;
                                correspondenciaRespond.fechaCorrespondencia = new Date(correspondenciaRespond.fechaCorrespondencia);
                                if (correspondenciaRespond.fechaCarta !== null) {
                                    correspondenciaRespond.fechaCarta = new Date(correspondenciaRespond.fechaCarta);
                                }

                                correspondenciaRespond.idRegistro = $scope.correspondencia.idRegistro;
                                $uibModalInstance.dismiss(correspondenciaRespond);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.setFechaSesion = function () {
                    setFechaSesion($scope, $log);
                };
            }]);
function buscarRegistro($scope, $uibModal) {
    var modalInstance = $uibModal.open({
        templateUrl: 'registro/registroSearch.html',
        controller: "SearchRegistroController",
        size: 'md',
        backdrop: 'static',
        keyboard: false,
        resolve: {
            registros: ['registroRR', function (registroRR) {
                    return registroRR.listFindAll();
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
                    $scope.correspondencia.registro.idRegistro = data.idRegistro;
                    $scope.correspondencia.idRegistro = data.idRegistro;
                    $scope.correspondencia.equivalenciaCorrelativo = data.equivalenciaCorrelativo;
                    $scope.correspondencia.equivalenciaCorrelativo = data.protocolo;
                }
            }
        } else {
            //Si es cancel
        }
    });
}

function setFechaSesion($scope, $log) {
    $scope.correspondencia.fechaSesion = new Date($scope.fechasSesion);
}

