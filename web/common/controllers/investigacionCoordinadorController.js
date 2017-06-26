var app=angular.module("app");

app.controller("ReadInvestigacionCoordinadorController", ['$scope', 'investigacionCoordinador', 'investigacionCoordinadorRemoteResource', '$location',"$log", function($scope, investigacionCoordinador, investigacionCoordinadorRemoteResource, $location, $log) {
        $log.log("entrando ReadInvestigacionCoordinadorController");
        $scope.investigacionCoordinador = investigacionCoordinador;
        
        $log.log($scope.investigacionCoordinador);
        
//        $scope.otroGato=function(){
//            $log.log("dio click");
//            
//            var invCoordinadorId={
//                idInvestigacion:"INV1700001",
//                idCoordinador: "COD1700002"
//            };
//            
//            investigacionRemoteResource.get(invCoordinadorId)
//                .then(function(invCoordinadorRespond) {
//                    $log.log("get invCoordinadorId");
//                    $log.log(invCoordinadorRespond);
//
//                }, function(bussinessMessages) {
//                    $scope.bussinessMessages = bussinessMessages;
//                });
//        };
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

app.controller("NewInvestigacionCoordinadorController", ['$scope', 'investigacionCoordinadorRemoteResource', '$location',"$log", function($scope, investigacionCoordinadorRemoteResource, $location, $log) {
        
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
                $scope.investigacionCoordinador.usuarioIngresa="user1";
                $scope.investigacionCoordinador.fechaIngreso=new Date();
                investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
                .then(function(investigacionCoordinadorResult) {
                    $location.path("investigacionCoordinadorEdit/"+investigacionCoordinadorResult.id.idInvestigacion+"/"+investigacionCoordinadorResult.id.idCoordinador);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };

}]);