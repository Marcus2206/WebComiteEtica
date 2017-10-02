var app = angular.module("app");

app.controller("NewPatrocinadorController",
        ['$scope', 'patrocinadorRR', '$location', "$log", 'opcion',
            "$uibModalInstance", 'SweetAlert', '$rootScope',
            function ($scope, patrocinadorRR, $location, $log, opcion,
                    $uibModalInstance, SweetAlert, $rootScope) {

                $scope.deshabilitado = true;
                $scope.isCro = true;
                $scope.opcion = opcion;
                /*Se construyer el json*/
                $scope.patrocinador = {
                    idPatrocinador: "",
                    nombre: "",
                    usuarioIngresa: "",
                    fechaIngreso: "",
                    usuarioModifica: "",
                    fechaModificacion: ""
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.patrocinador.usuarioIngresa = $rootScope.username;
                    $scope.patrocinador.fechaIngreso = new Date();
                    patrocinadorRR.insert($scope.patrocinador)
                            .then(function (patrocinadorResult) {
                                //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                                $uibModalInstance.dismiss(patrocinadorResult);
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
                    $uibModalInstance.dismiss('cancel');
                };

            }]);

app.controller("ListPatrocinadorController",
        ['$scope', "patrocinadors", "patrocinadorRR", '$location', "$log", "$route", "$uibModal",
            '$confirm', 'SweetAlert',
            function ($scope, patrocinadors, patrocinadorRR, $location, $log, $route, $uibModal,
                    $confirm, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.patrocinadors = patrocinadors;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idPatrocinador', descripcion: 'Id. Patrocinador'},
                    {nombre: 'nombre', descripcion: 'Nombre'},
                    {nombre: 'ruc', descripcion: 'RUC'}];

                $scope.displayCollection = [].concat($scope.patrocinadors);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.patrocinadors.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (patrocinador) {
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
                            patrocinadorRR.delete(patrocinador)
                                    .then(function (patrocinadorResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.patrocinadors.splice($scope.patrocinadors.indexOf(patrocinador), 1);
                                        SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "El patrocinador esta asociado a una investigación activa.", "warning");
                                    });
                        } else {

                        }
                    });
                };

                /*Editar un registro*/
                $scope.editarModal = function (patrocinadorObj, opcion) {
                    $scope.patrocinadorObj = patrocinadorObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'patrocinador/patrocinadorEdit.html',
                        controller: "EditPatrocinadorController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            patrocinador: function () {
                                return patrocinadorRR.get(patrocinadorObj.idPatrocinador);
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
                        templateUrl: 'patrocinador/patrocinadorEdit.html',
                        controller: "NewPatrocinadorController",
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
                                    $scope.patrocinadors.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditPatrocinadorController",
        ['$scope', "patrocinador", 'patrocinadorRR', '$location', "croRR", 'opcion',
            "$log", "$route", "$uibModalInstance", 'SweetAlert', '$rootScope', "patrocinadorCroRR",
            "$confirm",
            function ($scope, patrocinador, patrocinadorRR, $location, croRR, opcion,
                    $log, $route, $uibModalInstance, SweetAlert, $rootScope, patrocinadorCroRR,
                    $confirm) {

                $scope.patrocinadorCros = [];
                $scope.crosSelectList = [];
                $scope.croSelect = {};
                $scope.isCro = true;
                $scope.opcion = opcion;
                $scope.patrocinador = patrocinador;

                /*Cros seleccionables*/
                croRR.listCroSinIdPatrocinadorFind($scope.patrocinador.idPatrocinador)
                        .then(function (crosRespond) {
                            $scope.crosSelectList = crosRespond;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });

                /*Detalle de PatrocinaorCro*/
                patrocinadorCroRR.listCroByIdPatrocinador($scope.patrocinador.idPatrocinador)
                        .then(function (patrocinadorCroResponse) {
                            $scope.patrocinadorCros = patrocinadorCroResponse;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                            //Mensaje de error
                        });


                /*Agregar Coordinador*/
                $scope.agregarCro = function () {
                    $scope.patrocinadorCro = {id: {idPatrocinador: "",
                            idCro: ""},
                        observacion: "",
                        usuarioIngresa: $rootScope.username,
                        fechaIngreso: new Date()};

                    $scope.patrocinadorCro.id.idCro = $scope.croSelect.idCro;
                    $scope.patrocinadorCro.id.idPatrocinador = $scope.patrocinador.idPatrocinador;
                    $scope.patrocinadorCro.observacion = "";
                    $scope.patrocinadorCro.usuarioIngresa = $rootScope.username;
                    $scope.patrocinadorCro.fechaIngreso = new Date();
                    patrocinadorCroRR.insert($scope.patrocinadorCro)
                            .then(function (patrCroRespond) {
                                var ic = $scope.patrocinadorCro;
                                var c = $scope.croSelect;
                                var patrCro = [ic, c];

                                $scope.patrocinadorCros.push(patrCro);
                                $scope.crosSelectList.splice($scope.crosSelectList.indexOf($scope.croSelect), 1);
                                $scope.croSelect = {};
                            }, function (bussinessMessages) {

                            });
                };

                /*Eliminar Coordinador*/
                $scope.eliminarPatrCro = function (patrCro) {
                    $confirm({
                        text: '¿Está seguro de eliminar este registro?',
                        ok: "Sí",
                        cancel: "No",
                        title: "Eliminar Cro"
                    },
                            {size: 'sm',
                                backdrop: 'static'}
                    )
                            .then(function () {
                                patrocinadorCroRR.delete(patrCro[0])
                                        .then(function (patrCroResponse) {
                                            $scope.crosSelectList.push(patrCro[1]);
                                            $scope.patrocinadorCros.splice($scope.patrocinadorCros.indexOf(patrCro), 1);
                                        }, function (bussinessMessages) {

                                        });
                            })
                            .catch(function () {

                            });
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.patrocinador.usuarioModifica = $rootScope.username;
                    $scope.patrocinador.fechaModificacion = new Date();
                    patrocinadorRR.update($scope.patrocinador)
                            .then(function (patrocinadorResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var index = $scope.patrocinadors.indexOf($scope.patrocinadorObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(patrocinadorResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.patrocinadors[index][key] = value;
                                        }
                                    });
                                }
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                //$scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");

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
