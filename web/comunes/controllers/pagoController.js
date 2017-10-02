var app = angular.module("app");

app.controller("EditPagoController",
        ['$scope', 'pago', 'parametros', 'pagoRR', 'pagoDetalleRR',
            "$log", "$uibModalInstance", 'SweetAlert', 'cros', 'patrocinadors',
            '$uibModal', '$rootScope', 'opcion',
            function ($scope, pago, parametros, pagoRR, pagoDetalleRR,
                    $log, $uibModalInstance, SweetAlert, cros, patrocinadors,
                    $uibModal, $rootScope, opcion) {

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
                $scope.opcion = opcion;
                $scope.parametros = parametros;
                $scope.paramEstadoPago = $scope.filtrar($scope.parametros, 'P009')[0].parametroDetalles;
                $scope.pagoDetalles = [];

//                $scope.opcionFacturacion = {};
                $scope.opcionFacturacions = [{id: "01", descripcion: "Cro"}, {id: "02", descripcion: "Patrocinador"}, {id: "03", descripcion: "Otro"}];

                $scope.isDetalle = true;

                $scope.proveedores;
                $scope.pago = pago;
                $scope.facturacionSelected = {};
                $scope.etiqueta = "&nbsp;";
                $scope.cros = cros;
                $scope.patrocinadors = patrocinadors;

                $scope.setOpcionFacturacion = function () {
                    if ($scope.pago.opcionFacturacion === '01') {
                        $scope.etiqueta = "Cro:";
                        $scope.proveedores = $scope.cros;
                        $scope.facturacionSelected = {};
                    } else if ($scope.pago.opcionFacturacion === '02') {
                        $scope.etiqueta = "Patrocinador:";
                        $scope.proveedores = $scope.patrocinadors;
                        $scope.facturacionSelected = {};
                    } else if ($scope.pago.opcionFacturacion === '03') {
                        $scope.proveedores = [];
                        $scope.facturacionSelected = {};
                    }
                };

                $scope.setDatos = function () {
                    if ($scope.pago.opcionFacturacion === '01') {
                        $scope.pago.idProveedor = $scope.facturacionSelected.selected.idCro;
                    } else if ($scope.pago.opcionFacturacion === '02') {
                        $scope.pago.idProveedor = $scope.facturacionSelected.selected.idPatrocinador;
                    } else {
                        $scope.pago.idProveedor = null;
                    }

                    $scope.pago.razonSocial = $scope.facturacionSelected.selected.razonSocial;
                    $scope.pago.ruc = $scope.facturacionSelected.selected.ruc;
                    $scope.pago.direccion = $scope.facturacionSelected.selected.direccion;
                };

                pagoDetalleRR.listFindPagoDetalleByPago(pago.idPago)
                        .then(function (pagoDetalleResponse) {
                            $scope.pagoDetalles = pagoDetalleResponse;
                        }, function (bussinessMessages) {

                        });
                $scope.guardar = function () {
                    $scope.pago.usuarioModifica = $rootScope.username;
                    $scope.pago.fechaModificacion = new Date();
                    if ($scope.pago.nroFactura !== '') {
                        $scope.pago.paramEstadoPago = 'PD03';
                    } else {
                        $scope.pago.paramEstadoPago = 'PD01';
                    }
                    pagoRR.update($scope.pago)
                            .then(function (pagoRespond) {
                                var listbox = document.getElementById("paramEstadoPago");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                pagoRespond.paramEstadoPago = selText;

                                listbox = document.getElementById("fechaControl");
                                pagoRespond.fechaControl = listbox.value;

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
                                $scope.formPago.$setPristine();
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                };

                $scope.eliminarDetalle = function (pagoDetalle) {
                    window.onkeydown = null;
                    window.onfocus = null;
                    pagoDetalleRR.delete(pagoDetalle)
                            .then(function (pagoDetalleResponse) {
                                SweetAlert.swal("Hecho!", "Se ha removido con éxito.", "success");
                                $scope.pagoDetalles.splice($scope.pagoDetalles.indexOf(pagoDetalle), 1);
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
                            });
                };


                /*Editar un registro*/
                $scope.editarDetalle = function (pagoDetalleObj) {
                    $scope.pagoDetalleObj = pagoDetalleObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'pagoDetalle/pagoDetalleEdit.html',
                        controller: "EditPagoDetalleController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            pagoDetalle: function () {
                                return pagoDetalleRR.get(pagoDetalleObj);
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

                $scope.enviarMailConta = function () {
                    if (!$scope.formPago.$dirty) {
                        pagoRR.sendMailConta($scope.pago)
                                .then(function (pagoResponse) {
                                    if (pagoResponse === 1) {
                                        SweetAlert.swal("Hecho!", "Se envió con éxito.", "success");
                                        $scope.pago.contador++;
                                    } else {
                                        SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                                    }
                                }, function (error) {
                                    SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                                });
                    } else {
                        SweetAlert.swal("Hubo un error!", "Guardar los datos antes del envío.", "warning");
                    }
                };

                $scope.enviarMailCopia = function () {
                    if (!$scope.formPago.$dirty) {
                        pagoRR.sendMailCopia($scope.pago)
                                .then(function (pagoResponse) {
                                    if (pagoResponse === 1) {
                                        SweetAlert.swal("Hecho!", "Se envió con éxito.", "success");
                                    } else {
                                        SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                                    }
                                }, function (error) {
                                    SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                                });
                    } else {
                        SweetAlert.swal("Hubo un error!", "Guardar los datos antes del envío.", "warning");
                    }
                };

                $scope.setOpcionFacturacion();

                $scope.filtrarObjetos = function (obj, param, op) {

                    function filterByidProveedor(obj) {
                        if (op === 1) {
                            if (obj.idCro === param) {
                                return obj;
                            }
                        } else {
                            if (obj.idPatrocinador === param) {
                                return obj;
                            }
                        }
                    }

                    return obj.filter(filterByidProveedor);
                };

                if ($scope.pago.opcionFacturacion === '01') {
                    $scope.facturacionSelected.selected = $scope.filtrarObjetos($scope.cros, $scope.pago.idProveedor, 1)[0];
                } else if ($scope.pago.opcionFacturacion === '02') {
                    $scope.facturacionSelected.selected = $scope.filtrarObjetos($scope.patrocinadors, $scope.pago.idProveedor, 2)[0];
                }

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);

app.controller("ListPagoController",
        ['$scope', "pagos", "idNotificacionParam", "pagoRR",
            "$log", "$uibModal", 'SweetAlert',
            function ($scope, pagos, idNotificacionParam, pagoRR,
                    $log, $uibModal, SweetAlert) {

                /*Se obtiene lista de registros*/
                $scope.pagos = pagos;

                if (idNotificacionParam !== "all") {
                    var bg = document.getElementById("buscaGlobal");
                    bg.value = idNotificacionParam;
                }
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

                $scope.itemsByPage;

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
                $scope.editarModal = function (pagoObj, opcion) {
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
                                }],
                            opcion: opcion,
                            cros: ['croRR', function (croRR) {
                                    return croRR.list();
                                }],
                            patrocinadors: ['patrocinadorRR', function (patrocinadorRR) {
                                    return patrocinadorRR.list();
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
                        keyboard: false,
                        resolve: {
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
                                    $scope.pagos.push(data);
                                    $scope.editarModal(data, false);
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
                            window.onkeydown = null;
                            window.onfocus = null;
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
            '$q', '$rootScope', 'opcion', '$q',
            function ($scope, pagoRR, correspondenciaServicioRR, pagoRR,
                    $log, $uibModalInstance, SweetAlert, pagoDetalleRR,
                    $q, $rootScope, opcion, q1) {

                $scope.observacion = "";
                $scope.correspondenciaServicios = [];
                $scope.opcion = opcion;
                correspondenciaServicioRR.listServicioSinPagoFindAll()
                        .then(function (correspondenciaServicioResponse) {
                            $scope.correspondenciaServicios = correspondenciaServicioResponse;
                        }, function (bussinessMessages) {

                        });

                $scope.guardar = function () {
                    var sequence = $q.defer();
                    sequence.resolve();
                    sequence = sequence.promise;

                    var sequence2 = q1.defer();
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

                    var pago = {
                        idPago: "",
                        costo: total,
                        nroFactura: "",
                        observacion: $scope.observacion,
                        paramEstadoPago: "PD01",
                        contador: 0,
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()
                    };

                    if (cont !== 0) {
                        var pagoDetalles = [];
                        angular.forEach($scope.correspondenciaServicios, function (item, key) {
                            if (item.generar) {
                                var pgd = {
                                    id: {idPago: "",
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
                                pagoDetalles.push(pgd);
                            }
                        });

                        pago.pagoDetalles = pagoDetalles;

                        pagoRR.insert(pago)
                                .then(function (pagoResponse) {
                                    SweetAlert.swal("¡Hecho!", "Se ha registrado el pago.", "success");
                                    pagoResponse.paramEstadoPago = "Pendiente";
                                    $uibModalInstance.dismiss(pagoResponse);
                                }, function (bussinessMessages) {
                                    $scope.bussinessMessages = bussinessMessages;
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
