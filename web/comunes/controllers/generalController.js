var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});




app.controller("subirController", function ($scope, $http, $log, registros, NgTableParams) {
//    /*Se obtiene lista de registros*/
    $scope.registros = registros;

    /*Columnas para realizar el filtro*/
    $scope.predicates = [{nombre: 'idRegistro', descripcion: 'Id. Registro'},
        {nombre: 'paramEstadoRegistro', descripcion: 'Estado Registro'},
        {nombre: 'idInvestigacion', descripcion: 'Investigación'},
        {nombre: 'idInvestigador', descripcion: 'Investigador'},
        {nombre: 'paramNotificacion', descripcion: 'Notificación'}];
    $scope.selectedPredicate = $scope.predicates[0];


    var self = this;
    $scope.data = [{name: "Moroni", age: 50},{name: "asdasd", age: 12} ,{name: "ddddd", age: 65} ,{name: "eeeeeMoroni", age: 88}  /*,*/];
    $scope.tableParams = new NgTableParams({}, {dataset: $scope.data});

});

