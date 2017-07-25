var app = angular.module("app");

app.controller("EditRegistroController",
        ['$scope', 'registro', 'parametros', 'registroRR',
//            'coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource',
//            'investigadorRR', 'investigacionInvestigadorRR',
//            'sedeRR', 'investigacionSedeRR',
            '$location', "$log", '$filter', "$uibModalInstance", "$confirm", 'SweetAlert',
            'fileUpload',
            function ($scope, registro, parametros, registroRR,
//                    coordinadorRemoteResource, investigacionCoordinadorRemoteResource,
//                    investigadorRR, investigacionInvestigadorRR,
//                    sedeRR, investigacionSedeRR,
                    $location, $log, $filter, $uibModalInstance, $confirm, SweetAlert,
                    fileUpload) {

                $scope.registroRespondTemp;
                $scope.parametros = parametros;
//                $scope.deshabilitado = false;

//                $scope.investigacionCoordinadors = [];
//                $scope.investigacionInvestigadors = [];
//                $scope.investigacionSedes = [];

                $scope.nombreBoton = "Editar";

//                $scope.coordinadorsSelectList = [];
//                $scope.investigadorsSelectList = [];
//                $scope.sedesSelectList = [];

//                $scope.coordinadorSelect = {};
//                $scope.investigadorSelect = {};
//                $scope.sedeSelect = {};
//
//                $scope.isCoordinador = true;
//                $scope.isInvestigador = true;
//                $scope.isSede = true;

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

//                registro.fechaCorrespondencia = new Date(registro.fechaCorrespondencia);
//                if (correspondencia.fechaCarta !== null) {
//                    correspondencia.fechaCarta = new Date(correspondencia.fechaCarta);
//                }

                $scope.registro = registro;

                $scope.guardar = function () {
                    $scope.registro.usuarioModifica = "sa";
                    $scope.registro.fechaModificacion = new Date();
                    registroRR.update($scope.registro)
                            .then(function (registroRespond) {
//                                var listbox = document.getElementById("paramTipoServicio");
//                                var selIndex = listbox.selectedIndex;
//                                var selText = listbox.options[selIndex].text;
//                                correspondenciaRespond.paramTipoServicio = selText;
//
//                                listbox = document.getElementById("paramDistribucion");
//                                selIndex = listbox.selectedIndex;
//                                selText = listbox.options[selIndex].text;
//                                correspondenciaRespond.paramDistribucion = selText;
//
//                                correspondenciaRespond.enviarCorreo = ((correspondenciaRespond.enviarCorreo) ? 1 : 0);
//                                correspondenciaRespond.enviado = ((correspondenciaRespond.enviado) ? 1 : 0);

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
                        $uibModalInstance.dismiss($scope.correspondenciaRespondTemp);
                    }
                };

                $scope.cerrarOtras = true;

                $scope.uploadFile = function () {
                    var file = $scope.myFile;
                    angular.forEach(file, function (item) {

                        fileUpload.uploadFileToUrl(item._file);
                    });
                };
            }]);

app.controller("ListRegistroController",
        ['$scope', "registros", "registroRR", '$location',
            "$log", "$route", "$uibModal", "$confirm", 'SweetAlert',
            function ($scope, registros, registroRR, $location,
                    $log, $route, $uibModal, SweetAlert) {

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
                    var modalInstance = $uibModal.open({
                        templateUrl: 'registro/registroEdit.html',
                        controller: "EditRegistroController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            registro: function () {
                                return registroRR.get(registroObj.idRegistro);
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
                                    var index = $scope.registros.indexOf(registroObj);
                                    if (index !== -1) {
                                        $scope.registros[index] = data;
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
//                            correspondencia.enviarCorreo = ((correspondencia.enviarCorreo === '1') ? 1 : 0);
//                            correspondencia.enviado = ((correspondencia.enviado === '1') ? 1 : 0);
                            registroRR.delete(registro)
                                    .then(function (registroResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.registros.splice($scope.registros.indexOf(registro), 1);
                                        SweetAlert.swal("¡Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "La investigación se encuentra activa.", "warning");
                                        $scope.bussinessMessages = bussinessMessages;
                                    });
                        } else {

                        }
                    });

                };

            }]);

app.controller("NewRegistroController",
        ['$scope', 'registroRR',
            'parametros', '$location', "$log", "$uibModalInstance", 'SweetAlert',
            function ($scope, registroRR,
                    parametros, $location, $log, $uibModalInstance, SweetAlert) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramTipoServicio = $scope.filtrar($scope.parametros, 'P001')[0].parametroDetalles;
                $scope.paramDistribucion = $scope.filtrar($scope.parametros, 'P002')[0].parametroDetalles;

                $scope.registroRespondTemp;
                /*Se construyer el json*/
                $scope.registro = {
                    idRegistro: "",
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
                    //if ($scope.form.$valid) {
                    $scope.registro.usuarioIngresa = "user1";
                    $scope.registro.fechaIngreso = new Date();
//                    $scope.correspondencia.fechaCorrespondencia=new Date(document.getElementById("fechaCorrespondencia"));
//                    $log.log($scope.correspondencia.fechaCorrespondencia);
                    registroRR.insert($scope.registro)
                            .then(function (registroRespond) {
//                                var listbox = document.getElementById("paramTipoServicio");
//                                var selIndex = listbox.selectedIndex;
//                                var selText = listbox.options[selIndex].text;
//                                correspondenciaRespond.paramTipoServicio = selText;
//
//                                listbox = document.getElementById("paramDistribucion");
//                                selIndex = listbox.selectedIndex;
//                                selText = listbox.options[selIndex].text;
//                                correspondenciaRespond.paramDistribucion = selText;
//
//                                correspondenciaRespond.fechaCorrespondencia = new Date(correspondenciaRespond.fechaCorrespondencia);
//
//                                if (correspondenciaRespond.fechaCarta !== null) {
//                                    correspondenciaRespond.fechaCarta = new Date(correspondenciaRespond.fechaCarta);
//                                } else {
//
//                                }

//                                registroRespond.enviarCorreo = ((registroRespond.enviarCorreo) ? 1 : 0);
//                                registroRespond.enviado = ((registroRespond.enviado) ? 1 : 0);

                                $scope.registroRespondTemp = registroRespond;
                                $uibModalInstance.dismiss(registroRespond);
                                SweetAlert.swal("Hecho", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    if (typeof ($scope.registroRespondTemp) === 'undefined') {
                        $uibModalInstance.dismiss('cancel');
                    } else {
                        $uibModalInstance.dismiss($scope.registroRespondTemp);
                    }
                };

            }]);
