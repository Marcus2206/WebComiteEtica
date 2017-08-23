var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});




app.controller("subirController", function ($scope, $http, $log, registros) {
//    $log.log(registros);
//    /*Se obtiene lista de registros*/
    $scope.registros = registros;
    
    /*Columnas para realizar el filtro*/
    $scope.predicates = [{nombre:'idRegistro',descripcion:'Id. Registro'},
                                        {nombre:'paramEstadoRegistro',descripcion:'Estado Registro'}, 
                                        {nombre:'idInvestigacion',descripcion:'Investigación'}, 
                                        {nombre:'idInvestigador',descripcion:'Investigador'}, 
                                        {nombre:'paramNotificacion',descripcion:'Notificación'}];
    $scope.selectedPredicate = $scope.predicates[0];


});

