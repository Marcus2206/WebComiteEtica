var app = angular.module("app");

app.controller("EditPagoDetalleController",
        ['$scope', 'parametros', 'pagoDetalleRR', 'pagoDetalle',
            "$log", "$uibModalInstance", 'SweetAlert',
            '$uibModal', '$rootScope',
            function ($scope, parametros, pagoDetalleRR, pagoDetalle,
                    $log, $uibModalInstance, SweetAlert,
                    $uibModal, $rootScope) {

                $scope.filtrar = function (obj, param) {
                    function filterByParametro(obj) {
                        if (obj.idParametro === param) {
                            return obj;
                        }
                    }
                    return obj.filter(filterByParametro);
                };

                $scope.parametros = parametros;
                $scope.paramTipoServicio = $scope.filtrar($scope.parametros, 'P001')[0].parametroDetalles;

                $scope.pagoDetalle = pagoDetalle;

                $scope.guardar = function () {
                    $scope.pagoDetalle.usuarioModifica = $rootScope.username;
                    $scope.pagoDetalle.fechaModificacion = new Date();
                    pagoDetalleRR.update($scope.pagoDetalle)
                            .then(function (pagoDetalleRespond) {
                                $scope.pago.costo = pagoDetalleRespond;
                                SweetAlert.swal("Hecho!", "Registro guardado exitosamente.", "success");
                            }, function (bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                                SweetAlert.swal("Hubo un error!", "Intente nuevamente o comuniquese con el administrador.", "warning");
                            });
                };

                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);

