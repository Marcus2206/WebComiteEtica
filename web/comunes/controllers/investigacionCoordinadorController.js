var app=angular.module("app");

app.controller("EditInvestigacionCoordinadorController", ['$scope', 'investigacionCoordinador', 'investigacionCoordinadorRemoteResource', '$location',"$log","$rootScope", function($scope, investigacionCoordinador, investigacionCoordinadorRemoteResource, $location, $log,$rootScope) {
        $scope.investigacionCoordinador = investigacionCoordinador;
}]);

app.controller("ListInvestigacionCoordinadorController", ['$scope', "investigacionCoordinadors", "investigacionCoordinadorRemoteResource", '$location',"$log","$route", function($scope, investigacionCoordinadors, investigacionCoordinadorRemoteResource, $location, $log,$route) {
        /*Se obtiene lista de coordinadores*/
        $scope.investigacionCoordinadors=investigacionCoordinadors;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.investigacionCoordinadors.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
        
        /*
        $scope.delete=function(coordinador){
            coordinadorRemoteResource.delete(coordinador)
                .then(function(coordinadorResult) {
                    $scope.coordinadors.splice($scope.coordinadors.indexOf(coordinador),1);
                }, function(bussinessMessages) {
                    //alert("aca");
                    //$scope.bussinessMessages = bussinessMessages;
                });
        };*/
        
}]);

app.controller("NewInvestigacionCoordinadorController", ['$scope', 'investigacionCoordinadorRemoteResource', '$location',"$log","$rootScope", function($scope, investigacionCoordinadorRemoteResource, $location, $log,$rootScope) {
        
        $scope.nombreBoton="Nuevo";
        
        /*Se construyer el json*/
        $scope.investigacionCoordinador = {
            id:{idInvestigacion: "" ,
                idCoordinador: ""},
            observacion:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:""
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.investigacionCoordinador.usuarioIngresa=$rootScope.username;
                $scope.investigacionCoordinador.fechaIngreso=new Date();
                investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
                .then(function(investigacionCoordinadorResult) {
//                    $location.path("investigacionCoordinadorEdit/"+investigacionCoordinadorResult.id.idInvestigacion+"/"+investigacionCoordinadorResult.id.idCoordinador);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };

}]);