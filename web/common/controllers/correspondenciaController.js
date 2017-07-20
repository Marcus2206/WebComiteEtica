var app = angular.module("app");

app.controller("EditCorrespondenciaController",
        ['$scope', 'correspondencia', 'parametros', 'correspondenciaRR',
//            'coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource',
//            'investigadorRR', 'investigacionInvestigadorRR',
//            'sedeRR', 'investigacionSedeRR',
            '$location', "$log", '$filter', "$uibModalInstance", "$confirm", 'SweetAlert',
            'fileUpload',
            function ($scope, correspondencia, parametros, correspondenciaRR,
//                    coordinadorRemoteResource, investigacionCoordinadorRemoteResource,
//                    investigadorRR, investigacionInvestigadorRR,
//                    sedeRR, investigacionSedeRR,
                    $location, $log, $filter, $uibModalInstance, $confirm, SweetAlert,
                    fileUpload) {

                $scope.correspondenciaRespondTemp;
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

                correspondencia.fechaCorrespondencia = new Date(correspondencia.fechaCorrespondencia);
                if (correspondencia.fechaCarta !== null) {
                    correspondencia.fechaCarta = new Date(correspondencia.fechaCarta);
                }

                $scope.correspondencia = correspondencia;

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

                                correspondenciaRespond.enviarCorreo = ((correspondenciaRespond.enviarCorreo) ? 1 : 0);
                                correspondenciaRespond.enviado = ((correspondenciaRespond.enviado) ? 1 : 0);

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


//        $scope.delete=function(investigacion){
//            investigacionRemoteResource.delete(investigacion)
//                .then(function(investigacionResult) {
//                    $scope.investigacions.splice($scope.investigacions.indexOf(investigacion),1);
//                    //Mensaje de éxito
//                }, function(bussinessMessages) {
//                    $scope.bussinessMessages = bussinessMessages;
//                    //Mensaje de error
//                });
//        };

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

                $scope.correspondenciaRespondTemp;
                /*Se construyer el json*/
                $scope.correspondencia = {
                    idCorrespondencia: "",
                    fechaCorrespondencia: new Date(),
                    fechaCarta: null,
                    registro: null,
                    paramTipoServicio: null,
                    paramDistribucion: null,
                    enviarCorreo:0,
                    enviado:0,
                    usuarioIngresa: null,
                    fechaIngreso: null,
                    usuarioModifica: null,
                    fechaModificacion: null
                };
                this.isOpen = false;
                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.correspondencia.usuarioIngresa = "user1";
                    $scope.correspondencia.fechaIngreso = new Date();
//                    $scope.correspondencia.fechaCorrespondencia=new Date(document.getElementById("fechaCorrespondencia"));
//                    $log.log($scope.correspondencia.fechaCorrespondencia);
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

                                correspondenciaRespond.enviarCorreo = ((correspondenciaRespond.enviarCorreo) ? 1 : 0);
                                correspondenciaRespond.enviado = ((correspondenciaRespond.enviado) ? 1 : 0);

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
                    }else{
                        $uibModalInstance.dismiss($scope.correspondenciaRespondTemp);
                    }
                };

            }]);
