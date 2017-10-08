var app = angular.module("app");

app.controller("NewFechaSesionController",
        ['$scope', 'fechaSesionRR', "$log", "$uibModalInstance", 'opcion',
            'SweetAlert', "$rootScope",
            function ($scope, fechaSesionRR, $log, $uibModalInstance, opcion,
                    SweetAlert, $rootScope) {

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
                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };
                $scope.popup2 = {
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

                $scope.opcion = opcion;
                $scope.deshabilitado = true;
                /*Se construyer el json*/
                $scope.fechaSesion = {};

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.fechaSesion.usuarioIngresa = $rootScope.username;
                    $scope.fechaSesion.fechaIngreso = new Date();
                    fechaSesionRR.insert($scope.fechaSesion)
                            .then(function (fechaSesionResult) {
                                $uibModalInstance.dismiss(fechaSesionResult);
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

app.controller("ListFechaSesionController",
        ['$scope', "fechaSesions", "fechaSesionRR", "$log", "$location", 'Excel',
            "$uibModal", 'SweetAlert', "fileRR",
            function ($scope, fechaSesions, fechaSesionRR, $log, $location, Excel,
                    $uibModal, SweetAlert, fileRR) {
                /*Se obtiene lista de coordinadores*/
                $scope.fechaSesions = fechaSesions;

                /*Columnas para realizar el filtro*/
                $scope.predicates = [{nombre: 'idFechaSesion', descripcion: 'Id. Fecha Sesión'},
                    {nombre: 'fechaSesion', descripcion: 'Fecha Sesión'},
                    {nombre: 'observacion', descripcion: 'Observación'}];

                $scope.displayCollection = [].concat($scope.fechaSesions);
                $scope.displayCollection1=[];
                /*Campo seleccionado*/
                $scope.selectedPredicate = $scope.predicates[0].nombre;

                /*Se setea la cantidad filas por vista*/
                $scope.currentPage = 0;
                $scope.pageSize = 20;

                $scope.itemsByPage;
                /*Calculando número de páginas*/
                $scope.numberOfPages = function () {
                    return Math.ceil($scope.fechaSesions.length / $scope.pageSize);
                };

                /*Ir a la sgte página*/
                $scope.setNextPagina = function () {
                    $scope.currentPage = $scope.currentPage + 1;
                    return $scope.currentPage;
                };

                $scope.eliminar = function (fechaSesion) {
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
                            fechaSesionRR.delete(fechaSesion)
                                    .then(function (correoResult) {
                                        //Se la elimenación es exitosa.
                                        $scope.fechaSesions.splice($scope.fechaSesions.indexOf(fechaSesion), 1);
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
                $scope.editarModal = function (fechaSesionObj, opcion) {
                    $scope.fechaSesionObj = fechaSesionObj;
                    var modalInstance = $uibModal.open({
                        templateUrl: 'fechaSesion/fechaSesionEdit.html',
                        controller: "EditFechaSesionController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope,
                        resolve: {
                            fechaSesion: function () {
                                return fechaSesionRR.get(fechaSesionObj.idFechaSesion);
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
                        templateUrl: 'fechaSesion/fechaSesionEdit.html',
                        controller: "NewFechaSesionController",
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            opcion: false
                        }
                    });

                    /*Ingresar un registro*/
                    modalInstance.result.then(function () {
                        //Si no devuelve nada.
                    }, function (data) {
                        //Si devuelve algo
                        if (data !== "cancel") {
                            if (data !== "backdrop click") {
                                if (data !== "escape key press") {
                                    $scope.fechaSesions.push(data);
                                    $scope.editarModal(data, false);
                                }
                            }
                        } else {
                            //Si es cancel
                        }
                    });
                };

                /*Generar Acta de Sesion*/
                $scope.generarActaSesion = function (sesion) {
                    fileRR.setActaSesion(sesion)
                            .then(function (rutaResponse) {
                                fileRR.downloadFileFromURLDirect(rutaResponse);
                            }, function (error) {
                                SweetAlert.swal("¡Advertencia!", "Ocurrió un inconveniente.", "warning");
                            });
                };

            }]);

app.controller("EditFechaSesionController",
        ['$scope', "fechaSesion", 'fechaSesionRR', 'opcion',
            "$uibModalInstance", 'SweetAlert', "$log", "$rootScope",
            function ($scope, fechaSesion, fechaSesionRR, opcion,
                    $uibModalInstance, SweetAlert, $log, $rootScope) {


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
                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };
                $scope.popup2 = {
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

                $scope.opcion = opcion;
                $scope.deshabilitado = false;
                $scope.fechaSesion = fechaSesion;

                $scope.guardar = function () {
                    //if ($scope.form.$valid) {
                    $scope.fechaSesion.usuarioModifica = $rootScope.username;
                    $scope.fechaSesion.fechaModificacion = new Date();
                    fechaSesionRR.update($scope.fechaSesion)
                            .then(function (fechaSesionResult) {
                                //Devuelve objeto actualizado y cierra modal
                                var index = $scope.fechaSesions.indexOf($scope.fechaSesionObj);
                                var texto = document.getElementById("fechaSesion");
                                fechaSesionResult.fechaSesion = texto.value;
                                if (index !== -1) {
                                    /*Conserva el valor del identificador HashKey del array inicial, sólo se actualzian los valores.*/
                                    angular.forEach(fechaSesionResult, function (value, key) {
                                        if (key !== '$$hashKey') {
                                            $scope.fechaSesions[index][key] = value;
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

                $scope.cerrar = function () {
                    //Se devuelve cancel
                    $uibModalInstance.dismiss('cancel');
                };
            }]);
