var app = angular.module("app");

app.controller("NewSedeController",
        ['$scope', 'sedeRR', '$location', "$log", "$uibModalInstance", "ubigeoRR",
            'SweetAlert', '$rootScope', 'opcion',
            function ($scope, sedeRR, $location, $log, $uibModalInstance, ubigeoRR,
                    SweetAlert, $rootScope, opcion) {

                $scope.departamentos;
                $scope.provincias;
                $scope.distritos;
                $scope.opcion = opcion;
                ubigeoRR.getDepartamentoList()
                        .then(function (ubigeoResult) {
                            $scope.departamentos = ubigeoResult;
                        }, function (bussinessMessages) {
                            $scope.bussinessMessages = bussinessMessages;
                        });

                $scope.cargarProvincia = function () {
                    $scope.sede.idProvincia = null;
                    $scope.sede.idDistrito = null;
                    $scope.distritos = [];
                    ubigeoRR.getProvinciaByDepartamento($scope.sede.idDepartamento)
                            .then(function (ubigeoResult) {
                                $scope.provincias = ubigeoResult;
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                            });
                };

                $scope.cargarDistrito = function () {
                    $scope.sede.idDistrito = null;
                    ubigeoRR.getDistritoByDepartamentoProvincia($scope.sede.idDepartamento, $scope.sede.idProvincia)
                            .then(function (ubigeoResult) {
                                $scope.distritos = ubigeoResult;
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                            });
                };

                /*Se construyer el json*/
                $scope.sede = {
                    idSede: "",
                    nombre: "",
                    direccion: "",
                    departamento: null,
                    provincia: null,
                    distrito: null,
                    usuarioIngresa: "",
                    fechaIngreso: "",
                    usuarioModifica: "",
                    fechaModificacion: ""
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.sede.usuarioIngresa = $rootScope.username;
                    $scope.sede.fechaIngreso = new Date();
                    sedeRR.insert($scope.sede)
                            .then(function (sedeResult) {
                                var listbox = document.getElementById("idDepartamento");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                sedeResult.idDepartamento = selText;

                                listbox = document.getElementById("idProvincia");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                sedeResult.idProvincia = selText;

                                listbox = document.getElementById("idDistrito");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                sedeResult.idDistrito = selText;

                                $uibModalInstance.dismiss(sedeResult);
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


app.controller("ListSedeController",
        ['$scope', "sedes", "sedeRR", '$location', "$log", "$route", "$uibModal",
            '$confirm', 'SweetAlert',
            function ($scope, sedes, sedeRR, $location, $log, $route, $uibModal,
                    $confirm, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.sedes = sedes;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idSede', descripcion: 'Id. Sede'},
                    {nombre: 'nombre', descripcion: 'Nombre'},
                    {nombre: 'direccion', descripcion: 'Dirección'},
                    {nombre: 'idDepartamento', descripcion: 'Departamento'},
                    {nombre: 'idProvincia', descripcion: 'Provincia'},
                    {nombre: 'idDistrito', descripcion: 'Distrito'}];

                $scope.displayCollection = [].concat($scope.sedes);
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;


                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.sedes.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (sede) {
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
                            sedeRR.delete(sede)
                                    .then(function (sedeResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.sedes.splice($scope.sedes.indexOf(sede), 1);
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
                $scope.editarModal = function (sedeObj, opcion) {
                    $scope.sedeObj = sedeObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'sede/sedeEdit.html',
                        controller: "EditSedeController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            sede: function () {
                                return sedeRR.get(sedeObj.idSede);
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
                        templateUrl: 'sede/sedeEdit.html',
                        controller: "NewSedeController",
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
                                    $scope.sedes.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditSedeController",
        ['$scope', "sede", 'sedeRR', '$location', "$log", "$route", "$uibModalInstance",
            "ubigeoRR", 'SweetAlert', '$rootScope', 'opcion',
            function ($scope, sede, sedeRR, $location, $log, $route, $uibModalInstance,
                    ubigeoRR, SweetAlert, $rootScope, opcion) {
                $scope.departamentos;
                $scope.provincias;
                $scope.distritos;
                $scope.first = true;
                $scope.opcion = opcion;
                $scope.cargarDistrito = function () {
                    if (!$scope.first) {
                        $scope.sede.idDistrito = null;
                    }
                    ;
                    ubigeoRR.getDistritoByDepartamentoProvincia($scope.sede.idDepartamento, $scope.sede.idProvincia)
                            .then(function (ubigeoResult) {
                                $scope.distritos = ubigeoResult;
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                            });
                };

                $scope.cargarProvincia = function () {
                    if (!$scope.first) {
                        $scope.sede.idProvincia = null;
                        $scope.sede.idDistrito = null;
                        $scope.distritos = [];
                    }
                    ;
                    ubigeoRR.getProvinciaByDepartamento($scope.sede.idDepartamento)
                            .then(function (ubigeoResult) {
                                $scope.provincias = ubigeoResult;
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                            });
                };

                $scope.cargarDepartamento = function () {
                    ubigeoRR.getDepartamentoList()
                            .then(function (ubigeoResult) {
                                $scope.departamentos = ubigeoResult;
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                            });
                };

                $scope.cargarDepartamento();

                $scope.sede = sede;

                if ($scope.sede.idDepartamento !== null) {
                    $scope.cargarProvincia();
                    if ($scope.sede.idProvincia !== null) {
                        $scope.cargarDistrito();
                    }
                }
                $scope.first = false;

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.sede.usuarioModifica = $rootScope.username;
                    $scope.sede.fechaModificacion = new Date();
                    sedeRR.update($scope.sede)
                            .then(function (sedeResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var listbox = document.getElementById("idDepartamento");
                                var selIndex = listbox.selectedIndex;
                                var selText = listbox.options[selIndex].text;
                                sedeResult.idDepartamento = selText;

                                listbox = document.getElementById("idProvincia");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                sedeResult.idProvincia = selText;

                                listbox = document.getElementById("idDistrito");
                                selIndex = listbox.selectedIndex;
                                selText = listbox.options[selIndex].text;
                                sedeResult.idDistrito = selText;

                                var index = $scope.sedes.indexOf($scope.sedeObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(sedeResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.sedes[index][key] = value;
                                        }
                                    });
                                }

                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                //$scope.bussinessMessages = bussinessMessages;
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
