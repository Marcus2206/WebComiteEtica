var app = angular.module("app");

app.controller("EditCorrespondenciaController",
        ['$scope', 'correspondencia', 'parametros', 'correspondenciaRR',
            'correspondenciaFileRR', 'fileRR', '$timeout',
//            'investigadorRR', 'investigacionInvestigadorRR',
//            'sedeRR', 'investigacionSedeRR',
            "$log", "$uibModalInstance", 'SweetAlert', "$q",
            function ($scope, correspondencia, parametros, correspondenciaRR,
                    correspondenciaFileRR, fileRR, $timeout,
//                    investigadorRR, investigacionInvestigadorRR,
//                    sedeRR, investigacionSedeRR,
                    $log, $uibModalInstance, SweetAlert, $q) {

                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1,
                    showWeeks: false
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.popup1 = {
                    opened: false
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

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

                $scope.correspondenciaRespondTemp;
                $scope.deshabilitado = false;
                $scope.isCorrespondenciaFile = true;
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

                $scope.paramTipoServicio = $scope.filtrar($scope.parametros, 'P001')[0].parametroDetalles;
                $scope.paramDistribucion = $scope.filtrar($scope.parametros, 'P002')[0].parametroDetalles;

                correspondencia.fechaCorrespondencia = new Date(correspondencia.fechaCorrespondencia);
                if (correspondencia.fechaCarta !== null) {
                    correspondencia.fechaCarta = new Date(correspondencia.fechaCarta);
                }

                $scope.correspondencia = correspondencia;

                /*Cargando archivos de correspondencia*/
                correspondenciaFileRR.findAllByIdCorrepondencia($scope.correspondencia.idCorrespondencia)
                        .then(function (correspondenciaFileRespond) {
//                            $scope.correspondenciaFiles = correspondenciaFileRespond;
                            $scope.relacionarFile(correspondenciaFileRespond);
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                        });

                $scope.guardar = function () {
                    $scope.correspondencia.usuarioModifica = "sa";
                    $scope.correspondencia.fechaModificacion = new Date();
                    correspondenciaRR.update($scope.correspondencia)
                            .then(function (correspondenciaRespond) {
                                var listbox = document.getElementById("paramTipoServicio");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                correspondenciaRespond.paramTipoServicio = selText;

                                listbox = document.getElementById("paramDistribucion");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                correspondenciaRespond.paramDistribucion = selText;

                                $scope.correspondenciaRespondTemp = correspondenciaRespond;
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                };

                $scope.cerrar = function () {
                    if (typeof ($scope.correspondenciaRespondTemp) === 'undefined') {
                        $uibModalInstance.dismiss('cancel');
                    } else {

                        $scope.correspondenciaRespondTemp.idRegistro = $scope.correspondenciaRespondTemp.registro.idRegistro;
                        $log.log($scope.correspondenciaRespondTemp);
                        $uibModalInstance.dismiss($scope.correspondenciaRespondTemp);
                    }
                };

                $scope.cerrarOtras = true;

                $scope.myFile = [];
                $scope.progressBar = 0;

                $scope.downloadFile = function (file) {
                    fileRR.downloadFileFromURL(file);
                };

                $scope.uploadFile = function () {
                    var file = $scope.myFile;

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
                                            usuarioIngresa: "sa",
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


//                    angular.forEach(file, function (item) {
//                        if (item._progress === 0) {
                    //$timeout(function() { }, 2000);


//                            fileRR.uploadFileToUrl(item, $scope.correspondencia.idCorrespondencia)
//                                .then(function (response) {
//                                    var fileReturned = response.data;
//                                    var newCorrespondenciaFile = {
//                                        id: {
//                                            idCorrespondencia: $scope.correspondencia.idCorrespondencia,
//                                            fileDetalle: 0
//                                        },
//                                        nombreArchivo: fileReturned.nombreArchivo,
//                                        direccion: fileReturned.direccion,
//                                        usuarioIngresa: "sa",
//                                        fechaIngreso: new Date()
//                                    };
//
//                                    correspondenciaFileRR.insert(newCorrespondenciaFile)
//                                            .then(function (response) {
//                                                $log.log($scope.myFile);
//                                                item._correspondenciaFile = newCorrespondenciaFile;
//                                                $log.log($scope.myFile);
//                                            }, function (response) {
//                                            });
//                                }, function (bussinessMessages) {
//                                    $scope.bussinessMessages = bussinessMessages;
//                                });
//                        }
//                    });
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
            }]);

app.controller("ListCorrespondenciaController",
        ['$scope', "correspondencias", "correspondenciaRR", '$location',
            "$log", "$route", "$uibModal", "$confirm", 'SweetAlert',
            function ($scope, correspondencias, correspondenciaRR, $location,
                    $log, $route, $uibModal, $confirm, SweetAlert) {

                /*Se obtiene lista de correspondencias*/
                $scope.correspondencias = correspondencias;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

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
                $scope.editarModal = function (correspondenciaObj) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'correspondencia/correspondenciaEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                        controller: "EditCorrespondenciaController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            correspondencia: function () {
                                return correspondenciaRR.get(correspondenciaObj.idCorrespondencia);
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
                                    var index = $scope.correspondencias.indexOf(correspondenciaObj);
                                    if (index !== -1) {
                                        $scope.correspondencias[index] = data;
                                    }
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
                                    $scope.correspondencias.push(data);
                                    $scope.editarModal(data);
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
        ['$scope', 'correspondenciaRR',
            'parametros', '$location', "$log", "$uibModalInstance", 'SweetAlert',
            function ($scope, correspondenciaRR,
                    parametros, $location, $log, $uibModalInstance, SweetAlert) {

                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1,
                    showWeeks: false
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.popup1 = {
                    opened: false
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

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

                $scope.parametros = parametros;
                $scope.correspondenciaRespondTemp;
                $scope.deshabilitado = true;
                $scope.isCorrespondenciaFile = true;

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.paramTipoServicio = $scope.filtrar($scope.parametros, 'P001')[0].parametroDetalles;
                $scope.paramDistribucion = $scope.filtrar($scope.parametros, 'P002')[0].parametroDetalles;

                /*Se construyer el json*/
                $scope.correspondencia = {
                    idCorrespondencia: "",
                    fechaCorrespondencia: new Date(),
                    fechaCarta: null,
                    registro: null,
                    paramTipoServicio: null,
                    paramDistribucion: null,
                    enviarCorreo: 0,
                    enviado: 0,
                    usuarioIngresa: null,
                    fechaIngreso: null,
                    usuarioModifica: null,
                    fechaModificacion: null
                };

                $scope.guardar = function () {
                    $scope.correspondencia.usuarioIngresa = "user1";
                    $scope.correspondencia.fechaIngreso = new Date();

                    correspondenciaRR.insert($scope.correspondencia)
                            .then(function (correspondenciaRespond) {
                                var listbox = document.getElementById("paramTipoServicio");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                correspondenciaRespond.paramTipoServicio = selText;

                                listbox = document.getElementById("paramDistribucion");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                correspondenciaRespond.paramDistribucion = selText;

                                correspondenciaRespond.fechaCorrespondencia = new Date(correspondenciaRespond.fechaCorrespondencia);

                                if (correspondenciaRespond.fechaCarta !== null) {
                                    correspondenciaRespond.fechaCarta = new Date(correspondenciaRespond.fechaCarta);
                                } else {

                                }

                                $scope.correspondenciaRespondTemp = correspondenciaRespond;
                                $uibModalInstance.dismiss(correspondenciaRespond);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    if (typeof ($scope.correspondenciaRespondTemp) === 'undefined') {
                        $uibModalInstance.dismiss('cancel');
                    } else {
                        $uibModalInstance.dismiss($scope.correspondenciaRespondTemp);
                    }
                };

            }]);
