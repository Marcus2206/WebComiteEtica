var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.controller("subirController", function ($scope, $http, $log, fileUpload, investigacions) {
    $scope.myFile = [];
    $scope.progressBar = 0;

    $scope.investigacions = investigacions;
    $scope.investigacion;

    $scope.enviar = function () {
        $log.log($scope.investigacion);
//                    $uibModalInstance.dismiss(investigacionRespond);
    };

});


