var app = angular.module("app");

app.controller("NewInvestigadorController",
        ['$scope', 'investigadorRR', '$location', "$log", 'opcion',
            "$uibModalInstance", "parametroRR", "$rootScope", 'SweetAlert',
            function ($scope, investigadorRR, $location, $log, opcion,
                    $uibModalInstance, parametroRR, $rootScope, SweetAlert) {

                $scope.parametros;
                $scope.opcion = opcion;
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                parametroRR.list()
                        .then(function (parametrosResult) {
                            $scope.parametros = parametrosResult;
                            $scope.paramEspecialidadInvestigador = $scope.filtrar($scope.parametros, 'P008')[0].parametroDetalles;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                        });

                /*Se construyer el json*/
                $scope.investigador = {
                    idInvestigador: "",
                    apePaterno: "",
                    apeMaterno: "",
                    nombres: "",
                    correo: "",
                    paramEspecialidadInvestigador: "",
                    usuarioIngresa: "",
                    fechaIngreso: "",
                    usuarioModifica: "",
                    fechaModificacion: ""
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.investigador.usuarioIngresa = $rootScope.username;
                    $scope.investigador.fechaIngreso = new Date();
                    investigadorRR.insert($scope.investigador)
                            .then(function (investigadorResult) {
                                /*Agrega etiqueta a la lista*/
                                var listbox = document.getElementById("paramEspecialidadInvestigador");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                investigadorResult.paramEspecialidadInvestigador = selText;

                                $uibModalInstance.dismiss(investigadorResult);
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                            });
                    /*} else {
                     alert("Hay datos inválidos");
                     }*/
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);

app.controller("ListInvestigadorController",
        ['$scope', "investigadors", "investigadorRR", 'SweetAlert',
            '$location', "$log", "$route", "$uibModal", '$confirm',
            function ($scope, investigadors, investigadorRR, SweetAlert,
                    $location, $log, $route, $uibModal, $confirm) {
                /*Se obtiene lista de coordinadores*/
                $scope.investigadors = investigadors;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idInvestigador', descripcion: 'Código'},
                    {nombre: 'apePaterno', descripcion: 'Ape. Paterno'},
                    {nombre: 'apeMaterno', descripcion: 'Ape. Materno'},
                    {nombre: 'nombres', descripcion: 'Nombres'},
                    {nombre: 'correo', descripcion: 'Correo'},
                    {nombre: 'paramEspecialidadInvestigador', descripcion: 'Especialidad'}
                ];

                $scope.displayCollection = [].concat($scope.investigadors);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;
                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.investigadors.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (investigador) {
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
                            investigadorRR.delete(investigador)
                                    .then(function (investigadorResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.investigadors.splice($scope.investigadors.indexOf(investigador), 1);
                                        SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "El investigador pertenece a una investigación activa.", "warning");
                                    });
                        } else {

                        }
                    });
                };

                /*Editar un registro*/
                $scope.editarModal = function (investigadorObj, opcion) {
                    $scope.investigadorObj = investigadorObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'investigador/investigadorEdit.html',
                        controller: "EditInvestigadorController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            investigador: function () {
                                return investigadorRR.get(investigadorObj.idInvestigador);
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
                        templateUrl: 'investigador/investigadorEdit.html',
                        controller: "NewInvestigadorController",
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
                                    /*añade a la lista sin recargar la página*/
                                    $scope.investigadors.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditInvestigadorController",
        ['$scope', "investigador", 'investigadorRR',
            '$location', "$log", "$route", "$uibModalInstance",
            "parametroRR", "$rootScope", 'SweetAlert', 'opcion',
            function ($scope, investigador, investigadorRR,
                    $location, $log, $route, $uibModalInstance,
                    parametroRR, $rootScope, SweetAlert, opcion) {
                $scope.parametros;
                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                parametroRR.list().then(function (parametrosResult) {
                    $scope.parametros = parametrosResult;
                    $scope.paramEspecialidadInvestigador = $scope.filtrar($scope.parametros, 'P008')[0].parametroDetalles;
                }, function (bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });

                $scope.investigador = investigador;
                $scope.opcion = opcion;
                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.investigador.usuarioModifica = $rootScope.username;
                    $scope.investigador.fechaModificacion = new Date();
                    investigadorRR.update($scope.investigador)
                            .then(function (investigadorResult) {
                                /*Agrega etiqueta a la lista*/
                                var listbox = document.getElementById("paramEspecialidadInvestigador");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                investigadorResult.paramEspecialidadInvestigador = selText;

                                //Devuelve objeto actualizado y cierra modal
                                var index = $scope.investigadors.indexOf($scope.investigadorObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(investigadorResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.investigadors[index][key] = value;
                                        }
                                    });
                                }
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                //$scope.bussinessMessages = bussinessMessages;
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
