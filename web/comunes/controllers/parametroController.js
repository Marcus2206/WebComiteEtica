var app = angular.module("app");

app.controller("NewParametroController",
        ['$scope', 'parametroRR', "$log", "$uibModalInstance", 'opcion',
            'SweetAlert', "$rootScope",
            function ($scope, parametroRR, $log, $uibModalInstance, opcion,
                    SweetAlert, $rootScope) {

                $scope.opcion = opcion;
                $scope.isParametroDetalle = true;
                $scope.deshabilitado = true;
                /*Se construyer el json*/
                $scope.parametro = {parametroDetalles: []};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.parametro.usuarioIngresa = $rootScope.username;
                    $scope.parametro.fechaIngreso = new Date();
                    parametroRR.insert($scope.parametro)
                            .then(function (correoResult) {
                                $uibModalInstance.dismiss(correoResult);
                                SweetAlert.swal("Hecho", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            }
                            );
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);

app.controller("ListParametroController",
        ['$scope', "parametros", "parametroRR", "$log", "$location",
            "$uibModal", 'SweetAlert',
            function ($scope, parametros, parametroRR, $log, $location,
                    $uibModal, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.parametros = parametros;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idParametro', descripcion: 'Id. Parámetro'},
                    {nombre: 'descripcion', descripcion: 'Descripción'}];

                $scope.displayCollection = [].concat($scope.parametros);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.parametros.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (parametro) {
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
                            parametroRR.delete(parametro)
                                    .then(function (correoResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.parametros.splice($scope.parametros.indexOf(parametro), 1);
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
                $scope.editarModal = function (parametroObj, opcion) {
                    $scope.parametroObj = parametroObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'parametro/parametroEdit.html',
                        controller: "EditParametroController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            parametro: function () {
                                return parametroRR.get(parametroObj.idParametro);
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

                /*Ingresar un registro*/
                $scope.insertarModal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'parametro/parametroEdit.html',
                        controller: "NewParametroController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            opcion: false
                        }
                    });

                    modalInstance.result.then(function () {
                        //Si no devuelve nada.
                    }, function (data) {
                        //Si devuelve algo
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
                                    $scope.parametros.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditParametroController",
        ['$scope', "parametro", 'parametroRR', 'opcion', 'parametroDetalleRR',
            "$uibModalInstance", 'SweetAlert', "$log", "$rootScope",
            function ($scope, parametro, parametroRR, opcion, parametroDetalleRR,
                    $uibModalInstance, SweetAlert, $log, $rootScope) {


                $scope.opcion = opcion;
                $scope.isParametroDetalle = true;
                $scope.deshabilitado = false;
                $scope.parametro = parametro;

                $scope.parametroDetalleNew = {
                    id: {idParametro: $scope.parametro.idParametroDetalle,
                        idParametroDetalle: 0},
                    lugar: "",
                    precio: 0.00

                };
                $scope.descripcionDetalle = "";
                $scope.agregarDetalle = function () {
                    var detalle = {
                        id: {idParametro: $scope.parametro.idParametro,
                            idParametroDetalle: ""},
                        descripcion: $scope.descripcionDetalle,
                        valor: 0.00,
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()
                    };
                    parametroDetalleRR.insert(detalle)
                            .then(function (detalleResponse) {
                                $scope.parametro.parametroDetalles.push(detalleResponse);
                            }, function (error) {

                            });
                };
                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.parametro.usuarioModifica = $rootScope.username;
                    $scope.parametro.fechaModificacion = new Date();
                    $log.log($scope.parametro);
                    parametroRR.update($scope.parametro)
                            .then(function (correoResult) {
                                //Devuelve objeto actualizado y cierra modal

                                var index = $scope.parametros.indexOf($scope.parametroObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(correoResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.parametros[index][key] = value;
                                        }
                                    });
                                }

                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.guardarDetalle = function (parametroDetalle) {
                    //if ($scope.form.$valid) {
                    parametroDetalle.usuarioModifica = $rootScope.username;
                    parametroDetalle.fechaModificacion = new Date();

                    parametroDetalleRR.update(parametroDetalle)
                            .then(function (parametroDetalleResponse) {
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.eliminarDetalle = function (parametroDetalle) {
                    //if ($scope.form.$valid) {
                    parametroDetalleRR.delete(parametroDetalle)
                            .then(function (parametroDetalleResponse) {
                                $scope.parametro.parametroDetalles.splice($scope.parametro.parametroDetalles.indexOf(parametroDetalle), 1);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    //Se devuelve cancel
                    $uibModalInstance.dismiss('cancel');
                };
            }]);
