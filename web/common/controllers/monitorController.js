var app = angular.module("app");

app.controller("NewMonitorController", ['$scope', 'monitorRR', '$location', "$log", "$uibModalInstance", 'SweetAlert', function ($scope, monitorRR, $location, $log, $uibModalInstance, SweetAlert) {

        $scope.nombreBoton = "Nuevo";

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
            $scope.monitor.usuarioIngresa = "user1";
            $scope.monitor.fechaIngreso = new Date();
            monitorRR.insert($scope.monitor)
                    .then(function (monitorResult) {
                        //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
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

app.controller("ListMonitorController", ['$scope', "monitors", "monitorRR", '$location', "$log", "$route", "$uibModal", '$confirm', 'SweetAlert', function ($scope, monitors, monitorRR, $location, $log, $route, $uibModal, $confirm, SweetAlert) {
        /*Se obtiene lista de coordinadores*/
        $scope.monitors = monitors;

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
        $scope.editarModal = function (monitorObj) {
            //alert(idCoordinador);
            var modalInstance = $uibModal.open({
                templateUrl: 'monitor/monitorEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                controller: "EditMonitorController",
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    monitor: function () {
                        return monitorRR.get(monitorObj.idMonitor);
                    }
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
                            var index = $scope.monitors.indexOf(monitorObj);
                            if (index !== -1) {
                                $scope.monitors[index] = data;
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
                templateUrl: 'monitor/monitorEdit.html',
                controller: "NewMonitorController",
                size: 'md',
                backdrop: 'static',
                keyboard: false
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
                        }
                    }
                } else {
                    //Si es cancel
                }
            });
        };
    }]);

app.controller("EditMonitorController", ['$scope', "monitor", 'monitorRR', '$location', "$log", "$route", "$uibModalInstance", 'SweetAlert', function ($scope, monitor, monitorRR, $location, $log, $route, $uibModalInstance, SweetAlert) {
        $scope.monitor = monitor;

        $scope.guardar = function () {
            //if ($scope.form.$valid) {
            $scope.monitor.usuarioModifica = "user1";
            $scope.monitor.fechaModificacion = new Date();
            monitorRR.update($scope.monitor)
                    .then(function (monitorResult) {
                        //Devuelve objeto actualizado y cierra modal
                        $uibModalInstance.dismiss(monitorResult);
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
