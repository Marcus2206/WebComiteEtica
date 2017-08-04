var app = angular.module("app");

app.controller("SearchInvestigacionInvestigadorController",
        ['$scope', 'investigacionInvestigadorRR',
            "$log", "$uibModalInstance", 'investigacionInvestigadors',
            function ($scope, investigacionInvestigadorRR,
                    $log, $uibModalInstance, investigacionInvestigadors) {
                $scope.investigacionInvestigadors = investigacionInvestigadors;
                $scope.investigacionInvestigador = {};
                $scope.enviar = function () {
                    $uibModalInstance.dismiss($scope.investigacionInvestigador.selected);
                };
                $scope.cerrar = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }]);