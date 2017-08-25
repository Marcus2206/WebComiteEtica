var app = angular.module("app");

app.controller("EditPagoController",
        ['$scope', 'pago', 'parametros', 'pagoRR', 'pagoDetalleRR',
            "$log", "$uibModalInstance", 'SweetAlert',
            '$uibModal', '$rootScope',
            function ($scope, pago, parametros, pagoRR, pagoDetalleRR,
                    $log, $uibModalInstance, SweetAlert,
                    $uibModal, $rootScope) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramEstadoPago = $scope.filtrar($scope.parametros, 'P009')[0].parametroDetalles;
                $scope.pagoDetalles = [];

                $scope.isDetalle = true;

                $scope.pago = pago;

                pagoDetalleRR.listFindPagoDetalleByPago(pago.idPago)
                        .then(function (pagoDetalleResponse) {
                            $scope.pagoDetalles = pagoDetalleResponse;
                        }, function (bussinessMessages) {

                        });
                $scope.guardar = function () {
                    $scope.pago.usuarioModifica = $rootScope.username;
                    $scope.pago.fechaModificacion = new Date();
                    $log.log($scope.pago);
                    if ($scope.pago.nroFactura !== '') {
                        $scope.pago.paramEstadoPago = 'PD03';
                    } else {
                        $scope.pago.paramEstadoPago = 'PD01';
                    }
                    pagoRR.update($scope.pago)
                            .then(function (pagoRespond) {
                                $log.log(pagoRespond);
                                var listbox = document.getElementById("paramEstadoPago");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                pagoRespond.paramEstadoPago = selText;
                                var index = $scope.pagos.indexOf($scope.pagoObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(pagoRespond, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.pagos[index][key] = value;
                                        }
                                    });
                                }
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");

                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                };

                $scope.eliminarDetalle = function (pagoDetalle) {
                    pagoDetalleRR.delete(pagoDetalle)
                            .then(function (pagoDetalleResponse) {
                                SweetAlert.swal("Hecho!", "Se ha removido con éxito.", "success");
                                $scope.pagoDetalles.splice($scope.pagoDetalles.indexOf(pagoDetalle), 1);
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                };

                $scope.enviarMail = function () {
                    pagoRR.sendMail($scope.pago)
                            .then(function (pagoResponse) {
                                $log.log("pagoResponse");
                                $log.log(pagoResponse);
                                if (pagoResponse === 1) {
                                    SweetAlert.swal("Hecho!", "Se envió con éxito.", "success");
                                } else {
                                    SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                                }
                            }, function (error) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);

app.controller("ListPagoController",
        ['$scope', "pagos", "idNotificacionParam", "pagoRR",
            "$log", "$uibModal", 'SweetAlert',
            function ($scope, pagos, idNotificacionParam, pagoRR,
                    $log, $uibModal, SweetAlert) {

                if (idNotificacionParam !== "all") {
                     var bg = document.getElementById("busquedaGlobal");
                     bg.value=idNotificacionParam;
                }
                /*Se obtiene lista de registros*/
                $scope.pagos = pagos;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idPago', descripcion: 'Id. Pago'},
                    {nombre: 'costo', descripcion: 'Precio'},
                    {nombre: 'nroFactura', descripcion: 'Nro. Factura'},
                    {nombre: 'observacion', descripcion: 'Observación'},
                    {nombre: 'paramEstadoPago', descripcion: 'Estado Pago'}];

                $scope.displayCollection = [].concat($scope.pagos);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.pagos.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                /*Editar un registro*/
                $scope.editarModal = function (pagoObj) {
                    $scope.pagoObj = pagoObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'pago/pagoEdit.html',
                        controller: "EditPagoController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            pago: function () {
                                return pagoRR.get(pagoObj.idPago);
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
                        templateUrl: 'pago/pagoNew.html',
                        controller: "NewPagoController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false
                    });

                    modalInstance.result.then(function () {
                        //Si no se devuelve nada
                    }, function (data) {
                        //Si devuelve un objeto
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
                                    //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                                    $scope.pagos.push(data);
                                    $scope.editarModal(data);
                                }
                            }
                        } else {
                            //Si es cancel

                        }
                    });
                };

                $scope.eliminar = function (pago) {
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
                            pagoRR.delete(pago)
                                    .then(function (pagoResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.pagos.splice($scope.pagos.indexOf(pago), 1);
                                        SweetAlert.swal("¡Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "El registro cuenta con servicios asociados.", "warning");
                                        $scope.bussinessMessages = bussinessMessages;
                                    });
                        } else {

                        }
                    });

                };

            }]);

app.controller("NewPagoController",
        ['$scope', 'pagoRR', 'correspondenciaServicioRR', 'pagoRR',
            "$log", "$uibModalInstance", 'SweetAlert', 'pagoDetalleRR',
            '$q', '$rootScope',
            function ($scope, pagoRR, correspondenciaServicioRR, pagoRR,
                    $log, $uibModalInstance, SweetAlert, pagoDetalleRR,
                    $q, $rootScope) {

                $scope.observacion = "";
                $scope.correspondenciaServicios = [];
//                
                correspondenciaServicioRR.listServicioSinPagoFindAll()
                        .then(function (correspondenciaServicioResponse) {
                            $scope.correspondenciaServicios = correspondenciaServicioResponse;
                        }, function (bussinessMessages) {

                        });

                $scope.guardar = function () {
                    var sequence = $q.defer();
                    sequence.resolve();
                    sequence = sequence.promise;

                    var sequence2 = $q.defer();
                    sequence2.resolve();
                    sequence2 = sequence2.promise;

                    var cont = 0;
                    var total = 0;
                    angular.forEach($scope.correspondenciaServicios, function (item, key) {
                        if (item.generar) {
                            cont++;
                            total = parseFloat(total) + parseFloat(item.costo);
                        }
                    });

                    var pago = [{
                            idPago: "",
                            costo: total,
                            nroFactura: "",
                            observacion: $scope.observacion,
                            paramEstadoPago: "PD01",
                            usuarioIngresa: $rootScope.username,
                            fechaIngreso: new Date()
                        }];

                    if (cont !== 0) {
                        angular.forEach(pago, function (item, key) {
                            sequence = sequence.then(function () {
                                return pagoRR.insert(item)
                                        .then(function (pagoResponse) {
                                            angular.forEach($scope.correspondenciaServicios, function (item, key) {
                                                if (item.generar) {
                                                    sequence2 = sequence2.then(function () {
                                                        var pagoDetalle = {
                                                            id: {idPago: pagoResponse.idPago,
                                                                idPagoDetalle: 0
                                                            },
                                                            idCorrespondencia: item.idCorrespondencia,
                                                            idCorrespondenciaServicio: item.idCorrespondenciaServicio,
                                                            paramTipoServicio: item.paramTipoServicio,
                                                            costo: item.costo,
                                                            observacion: item.observacion,
                                                            usuarioIngresa: $rootScope.username,
                                                            fechaIngreso: new Date()
                                                        };

                                                        return pagoDetalleRR.insert(pagoDetalle)
                                                                .then(function (response) {

                                                                }, function (bussinessMessages) {
                                                                    $scope.bussinessMessages = bussinessMessages;
                                                                });
                                                    });

                                                }
                                            });
                                            SweetAlert.swal("¡Hecho!", "Se ha registrado el pago.", "success");
                                            pagoResponse.paramEstadoPago = "Pendiente";
                                            $uibModalInstance.dismiss(pagoResponse);
                                        }, function (bussinessMessages) {
                                            $scope.bussinessMessages = bussinessMessages;
                                            $log.log(bussinessMessages);
                                        });

                            });
                        });
                    } else {
                        SweetAlert.swal("Advertencia", "Debe seleccionar al menos un servicio para generar el pago.", "warning");
                    }
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);

app.controller("SearchPagoController",
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
