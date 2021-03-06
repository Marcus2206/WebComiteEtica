var app = angular.module("app");

app.controller("NewCroController",
        ['$scope', 'croRR', '$location', "$log", "$uibModalInstance",
            "$rootScope", "SweetAlert", 'opcion',
            function ($scope, croRR, $location, $log, $uibModalInstance,
                    $rootScope, SweetAlert, opcion) {

                $scope.deshabilitado = true;
                $scope.isPatrocinador = true;
                $scope.opcion = opcion;
                /*Se construyer el json*/
                $scope.cro = {
                    idCro: "",
                    nombre: "",
                    usuarioIngresa: "",
                    fechaIngreso: "",
                    usuarioModifica: null,
                    fechaModificacion: null
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.cro.usuarioIngresa = $rootScope.username;
                    $scope.cro.fechaIngreso = new Date();
                    croRR.insert($scope.cro)
                            .then(function (croResult) {
                                $uibModalInstance.dismiss(croResult);
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

app.controller("ListCroController",
        ['$scope', "cros", "croRR", "$log", 'Excel',
            "$uibModal", '$confirm', 'SweetAlert',
            function ($scope, cros, croRR, $log, Excel,
                    $uibModal, $confirm, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.cros = cros;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idCro', descripcion: 'Id. Cro'},
                    {nombre: 'nombre', descripcion: 'Nombre'},
                    {nombre: 'ruc', descripcion: 'RUC'}];

                $scope.displayCollection = [].concat($scope.cros);
                $scope.displayCollection1 = [];
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.cros.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (cro) {
                    //Se prepara confirm
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Cro"
                    },
                            {size: 'sm',
                                backdrop: 'static'
                            })
                            .then(function () {
                                window.onkeydown = null;
                                window.onfocus = null;
                                //Si se presiona Sí.
                                croRR.delete(cro)
                                        .then(function (croResult) {
                                            //Se la elimenación es exitosa.
                                            $scope.cros.splice($scope.cros.indexOf(cro), 1);
                                            SweetAlert.swal("Hecho", "El registro se eliminó con éxito.", "success");
                                        }, function (bussinessMessages) {
                                            SweetAlert.swal("Advertencia!", "El Cro incluye Patrocinadores relacionados.", "warning");
                                        });
                            })
                            .catch(function () {
                                //Si se presiona no, se cancela.
                            });
                };

                /*Editar un registro*/
                $scope.editarModal = function (croObj, opcion) {
                    $scope.croObj = croObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'cro/croEdit.html',
                        controller: "EditCroController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            cro: function () {
                                return croRR.get(croObj.idCro);
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
                        templateUrl: 'cro/croEdit.html',
                        controller: "NewCroController",
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
                                    $scope.cros.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditCroController",
        ['$scope', "cro", 'croRR', "$log", 'opcion',
            "$uibModalInstance", "$rootScope", "patrocinadorCroRR", "patrocinadorRR",
            "$confirm", "SweetAlert",
            function ($scope, cro, croRR, $log, opcion,
                    $uibModalInstance, $rootScope, patrocinadorCroRR, patrocinadorRR,
                    $confirm, SweetAlert) {

                $scope.patrocinadorCros = [];
                $scope.patrocinadorsSelectList = [];
                $scope.patrocinadorSelect = {};
                $scope.isPatrocinador = true;
                $scope.cro = cro;
                $scope.opcion = opcion;

                /*Patrocinadores seleccionables*/
                patrocinadorRR.listPatrocinadorSinIdCroFind($scope.cro.idCro)
                        .then(function (patrocinadorsRespond) {
                            $scope.patrocinadorsSelectList = patrocinadorsRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de PatrocinaorCro*/
                patrocinadorCroRR.listPatrocinadorByIdCro($scope.cro.idCro)
                        .then(function (patrocinadorCroResponse) {
                            $scope.patrocinadorCros = patrocinadorCroResponse;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Agregar Coordinador*/
                $scope.agregarPatrocinador = function () {
                    $scope.patrocinadorCro = {id: {idPatrocinador: "",
                            idCro: ""},
                        observacion: "",
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()};

                    $scope.patrocinadorCro.id.idPatrocinador = $scope.patrocinadorSelect.idPatrocinador;
                    $scope.patrocinadorCro.id.idCro = $scope.cro.idCro;
                    $scope.patrocinadorCro.observacion = "";
                    $scope.patrocinadorCro.usuarioIngresa = $rootScope.username;
                    $scope.patrocinadorCro.fechaIngreso = new Date();
                    patrocinadorCroRR.insert($scope.patrocinadorCro)
                            .then(function (invCoordRespond) {
                                var ic = $scope.patrocinadorCro;
                                var c = $scope.patrocinadorSelect;
                                var patrCro = [ic, c];

                                $scope.patrocinadorCros.push(patrCro);
                                $scope.patrocinadorsSelectList.splice($scope.patrocinadorsSelectList.indexOf($scope.patrocinadorSelect), 1);
                                $scope.patrocinadorSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Coordinador*/
                $scope.eliminarPatrCro = function (patrCro) {
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Patrocinar"
                    },
                            {size: 'sm',
                                backdrop: 'static'}
                    )
                            .then(function () {
                                window.onkeydown = null;
                                window.onfocus = null;
                                patrocinadorCroRR.delete(patrCro[0])
                                        .then(function (invCoordinadorRespond) {
                                            $scope.patrocinadorsSelectList.push(patrCro[1]);
                                            $scope.patrocinadorCros.splice($scope.patrocinadorCros.indexOf(patrCro), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.cro.usuarioModifica = $rootScope.username;
                    $scope.cro.fechaModificacion = new Date();
                    croRR.update($scope.cro)
                            .then(function (croResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var index = $scope.cros.indexOf($scope.croObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(croResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.cros[index][key] = value;
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
