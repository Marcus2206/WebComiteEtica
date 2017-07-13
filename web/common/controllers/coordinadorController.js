var app = angular.module("app");
app.controller("NewCoordinadorController", ['$scope', 'coordinadorRemoteResource', '$location', "$log", "$uibModalInstance", 'SweetAlert', function ($scope, coordinadorRemoteResource, $location, $log, $uibModalInstance, SweetAlert) {

        $scope.nombreBoton = "Nuevo";
        /*Se construyer el json*/
        $scope.coordinador = {
            idCoordinador: "",
            apePaterno: "",
            apeMaterno: "",
            nombres: "",
            usuarioIngresa: "",
            fechaIngreso: "",
            usuarioModifica: "",
            fechaModificacion: "",
            investigacionCoordinadors: []
        };
        $scope.guardar = function () {
            //if ($scope.form.$valid) {
            $scope.coordinador.usuarioIngresa = "user1";
            $scope.coordinador.fechaIngreso = new Date();
            coordinadorRemoteResource.insert($scope.coordinador)
                    .then(function (coordinadorResult) {
                        //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                        $uibModalInstance.dismiss(coordinadorResult);
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

app.controller("ListCoordinadorController", ['$scope', "coordinadors", "coordinadorRemoteResource", '$location', "$log", "$route", "$uibModal", '$confirm', 'SweetAlert', function ($scope, coordinadors, coordinadorRemoteResource, $location, $log, $route, $uibModal, $confirm, SweetAlert) {
        /*Se obtiene lista de coordinadores*/
        $scope.coordinadors = coordinadors;
        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        /*Calculando número de páginas*/
        $scope.numberOfPages = function () {
            return Math.ceil($scope.coordinadors.length / $scope.pageSize);
        };
        /*Ir a la sgte página*/
        $scope.setNextPagina = function () {
            $scope.currentPage = $scope.currentPage + 1;
            return $scope.currentPage;
        };
        $scope.eliminar = function (coordinador) {
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
                    coordinadorRemoteResource.delete(coordinador)
                            .then(function (coordinadorResult) {
                                //Se la elimenación es exitosa.
                                $scope.coordinadors.splice($scope.coordinadors.indexOf(coordinador), 1);
                                SweetAlert.swal("Hecho!", "Registro eliminado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                SweetAlert.swal("Advertencia", "El coordinador pertenece a una investigación activa.", "warning");
                            });
                } else {

                }
            });
        };
        /*Editar un registro*/
        $scope.editarModal = function (coordinadorObj) {
            //alert(idCoordinador);
            var modalInstance = $uibModal.open({
                templateUrl: 'coordinador/coordinadorEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                controller: "EditCoordinadorController",
                size: 'md',
                resolve: {
                    coordinador: function () {
                        return coordinadorRemoteResource.get(coordinadorObj.idCoordinador);
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
                            var index = $scope.coordinadors.indexOf(coordinadorObj);
                            if (index !== -1) {
                                $scope.coordinadors[index] = data;
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
                templateUrl: 'coordinador/coordinadorEdit.html',
                controller: "NewCoordinadorController",
                size: 'sm'
            });
            modalInstance.result.then(function () {
                //Si no devuelve nada.
            }, function (data) {
                //Si devuelve algo
                if (data !== "cancel") {
                    if (data !== "backdrop click") {
                        if (data !== "escape key press") {
                            /*añade a la lista sin recargar la página*/
                            $scope.coordinadors.push(data);
                        }
                    }
                } else {
                    //Si es cancel
                }
            });
        };
    }]);
app.controller("EditCoordinadorController", ['$scope', "coordinador", 'coordinadorRemoteResource', '$location', "$log", "$route", "$uibModalInstance", 'SweetAlert', function ($scope, coordinador, coordinadorRemoteResource, $location, $log, $route, $uibModalInstance, SweetAlert) {
        $scope.coordinador = coordinador;
        $scope.guardar = function () {
            //if ($scope.form.$valid) {
            $scope.coordinador.usuarioModifica = "user1";
            $scope.coordinador.fechaModificacion = new Date();
            coordinadorRemoteResource.update($scope.coordinador)
                    .then(function (coordinadorResult) {
                        //Devuelve objeto actualizado y cierra modal
                        $uibModalInstance.dismiss(coordinadorResult);
                        SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                    }, function (bussinessMessages) {
                        SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "danger");
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
