var app = angular.module("app");

app.controller("NewPatrocinadorController",
        ['$scope', 'patrocinadorRR', '$location', "$log",
            "$uibModalInstance", 'SweetAlert','$rootScope',
            function ($scope, patrocinadorRR, $location, $log,
                    $uibModalInstance, SweetAlert,$rootScope) {

                $scope.nombreBoton = "Nuevo";

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

app.controller("ListPatrocinadorController", ['$scope', "patrocinadors", "patrocinadorRR", '$location', "$log", "$route", "$uibModal", '$confirm', 'SweetAlert', function ($scope, patrocinadors, patrocinadorRR, $location, $log, $route, $uibModal, $confirm, SweetAlert) {
        /*Se obtiene lista de coordinadores*/
        $scope.patrocinadors = patrocinadors;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;

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
        $scope.editarModal = function (patrocinadorObj) {
            //alert(idCoordinador);
            var modalInstance = $uibModal.open({
                templateUrl: 'patrocinador/patrocinadorEdit.html',
                controller: "EditPatrocinadorController",
                size: 'md',
                resolve: {
                    patrocinador: function () {
                        return patrocinadorRR.get(patrocinadorObj.idPatrocinador);
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
                            var index = $scope.patrocinadors.indexOf(patrocinadorObj);
                            if (index !== -1) {
                                $scope.patrocinadors[index] = data;
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
                templateUrl: 'patrocinador/patrocinadorEdit.html',
                controller: "NewPatrocinadorController",
                size: 'md'
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
                        }
                    }
                } else {
                    //Si es cancel
                }
            });
        };
    }]);

app.controller("EditPatrocinadorController", ['$scope', "patrocinador", 'patrocinadorRR', '$location', "$log", "$route", "$uibModalInstance", 'SweetAlert','$rootScope', function ($scope, patrocinador, patrocinadorRR, $location, $log, $route, $uibModalInstance, SweetAlert,$rootScope) {
        $scope.patrocinador = patrocinador;

        $scope.guardar = function () {
            //if ($scope.form.$valid) {
            $scope.patrocinador.usuarioModifica = $rootScope.username;
            $scope.patrocinador.fechaModificacion = new Date();
            patrocinadorRR.update($scope.patrocinador)
                    .then(function (patrocinadorResult) {
                        //Devuelve objeto actualizado y cierra modal
                        $uibModalInstance.dismiss(patrocinadorResult);
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
