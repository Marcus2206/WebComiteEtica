var app = angular.module("app");

app.controller("SearchInvestigacionSedeController",
        ['$scope',
            "$log", "$uibModalInstance", 'investigacionSedes',
            function ($scope,
                    $log, $uibModalInstance, investigacionSedes) {
                $scope.investigacionSedes = investigacionSedes;
                $scope.investigacionSede = {};
                $scope.enviar = function () {
                    $uibModalInstance.dismiss($scope.investigacionSede.selected);
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);