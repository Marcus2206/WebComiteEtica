var app = angular.module("app");

app.controller("NewCorreoController",
        ['$scope', 'correoRR', "$log", "$uibModalInstance", "parametros",
            'SweetAlert',
            function ($scope, correoRR, $log, $uibModalInstance, parametros,
                    SweetAlert) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramAreaTrabajo = $scope.filtrar($scope.parametros, 'P011')[0].parametroDetalles;

                /*Se construyer el json*/
                $scope.correo = {};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.correo.usuarioIngresa = "user1";
                    $scope.correo.fechaIngreso = new Date();
                    correoRR.insert($scope.correo)
                            .then(function (correoResult) {
                                var listbox = document.getElementById("paramAreaTrabajo");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                correoResult.paramAreaTrabajo = selText;
                                $log.log(correoResult);
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
app.controller("ListCorreoController",
        ['$scope', "correos", "correoRR", "$log", "$location",
            "$uibModal", 'SweetAlert',
            function ($scope, correos, correoRR, $log, $location,
                    $uibModal, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.correos = correos;
                $log.log(correos);
                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.correos.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (correo) {
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
                            correoRR.delete(correo)
                                    .then(function (correoResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.correos.splice($scope.correos.indexOf(correo), 1);
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
                $scope.editarModal = function (correoObj) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'correo/correoEdit.html',
                        controller: "EditCorreoController",
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            correo: function () {
                                return correoRR.get(correoObj.idCorreo);
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
                                    var index = $scope.correos.indexOf(correoObj);
                                    if (index !== -1) {
                                        $scope.correos[index] = data;
                                    }
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
                        templateUrl: 'correo/correoEdit.html',
                        controller: "NewCorreoController",
                        size: 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            parametros: ['parametroRR', function (parametroRR) {
                                    return parametroRR.list();
                                }]
                        }
                    });

                    modalInstance.result.then(function () {
                        //Si no devuelve nada.
                    }, function (data) {
                        //Si devuelve algo
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
//                                    $log.log(data);
                                    /*añade a la lista sin recargar la página*/
                                    $log.log(data);
                                    $scope.correos.push(data);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditCorreoController",
        ['$scope', "correo", 'correoRR', "parametros",
            "$uibModalInstance", 'SweetAlert', "$log",
            function ($scope, correo, correoRR, parametros,
                    $uibModalInstance, SweetAlert, $log) {
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramAreaTrabajo = $scope.filtrar($scope.parametros, 'P011')[0].parametroDetalles;

                $scope.correo = correo;
                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.correo.usuarioModifica = "user1";
                    $scope.correo.fechaModificacion = new Date();
                    correoRR.update($scope.correo)
                            .then(function (correoResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var listbox = document.getElementById("paramAreaTrabajo");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                correoResult.paramAreaTrabajo = selText;

                                $uibModalInstance.dismiss(correoResult);
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
