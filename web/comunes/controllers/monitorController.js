var app = angular.module("app");

app.controller("NewMonitorController",
        ['$scope', 'monitorRR', '$location', "$log", "$uibModalInstance",
            'SweetAlert', '$rootScope','opcion',
            function ($scope, monitorRR, $location, $log, $uibModalInstance,
                    SweetAlert, $rootScope, opcion) {

                $scope.nombreBoton = "Nuevo";
                $scope.opcion=opcion;
                /*Se construyer el json*/
                $scope.monitor = {
                    idMonitor: "",
                    apePaterno: "",
                    apeMaterno: "",
                    nombres: "",
                    correo: "",
                    usuarioIngresa: "",
                    fechaIngreso: "",
                    usuarioModifica: "",
                    fechaModificacion: ""
                };

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.monitor.usuarioIngresa = $rootScope.username;
                    $scope.monitor.fechaIngreso = new Date();
                    monitorRR.insert($scope.monitor)
                            .then(function (monitorResult) {
                                $uibModalInstance.dismiss(monitorResult);
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

app.controller("ListMonitorController",
        ['$scope', "monitors", "monitorRR", '$location', "$log",
            "$route", "$uibModal", '$confirm', 'SweetAlert',
            function ($scope, monitors, monitorRR, $location, $log,
                    $route, $uibModal, $confirm, SweetAlert) {
                /*Se obtiene lista de coordinadores*/
                $scope.monitors = monitors;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idMonitor', descripcion: 'Id. Monitor'},
                    {nombre: 'apePaterno', descripcion: 'Ape. Paterno'},
                    {nombre: 'apeMaterno', descripcion: 'Ape. Materno'},
                    {nombre: 'nombres', descripcion: 'Nombres'},
                    {nombre: 'correo', descripcion: 'Correo'}];

                $scope.displayCollection = [].concat($scope.monitors);

                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;
                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.monitors.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (monitor) {
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
                            monitorRR.delete(monitor)
                                    .then(function (monitorResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.monitors.splice($scope.monitors.indexOf(monitor), 1);
                                        SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                                    }, function (bussinessMessages) {
                                        SweetAlert.swal("Advertencia", "El monitor esta asociado a una investigación activa.", "warning");

                                    });
                        } else {

                        }
                    });
                };

                /*Editar un registro*/
                $scope.editarModal = function (monitorObj, opcion) {
                    $scope.monitorObj = monitorObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'monitor/monitorEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                        controller: "EditMonitorController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            monitor: function () {
                                return monitorRR.get(monitorObj.idMonitor);
                            },
                            opcion:opcion
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
                        templateUrl: 'monitor/monitorEdit.html',
                        controller: "NewMonitorController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve:{
                            opcion:false
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
                                    $scope.monitors.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };
            }]);

app.controller("EditMonitorController",
        ['$scope', "monitor", 'monitorRR', '$location', "$log", "$route",
            "$uibModalInstance", 'SweetAlert', '$rootScope','opcion',
            function ($scope, monitor, monitorRR, $location, $log, $route,
                    $uibModalInstance, SweetAlert, $rootScope, opcion) {

                $scope.monitor = monitor;
                $scope.opcion=opcion;
                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.monitor.usuarioModifica = $rootScope.username;
                    $scope.monitor.fechaModificacion = new Date();
                    monitorRR.update($scope.monitor)
                            .then(function (monitorResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var index = $scope.monitors.indexOf($scope.monitorObj);
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(monitorResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.monitors[index][key] = value;
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
