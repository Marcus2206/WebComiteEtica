var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});




app.controller("subirController", function ($scope, $http, $log, registros) {
});

