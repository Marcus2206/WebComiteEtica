var app=angular.module("app");

app.controller("NewCoordinadorController", ['$scope', 'coordinadorRemoteResource', '$location',"$log", function($scope, coordinadorRemoteResource, $location, $log) {
        
        $scope.nombreBoton="Nuevo";
        
        /*Se construyer el json*/
        $scope.coordinador = {
            idCoordinador: "",
            apePaterno:"",
            apeMaterno:"",
            nombres:"",
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:"",
            investigacionCoordinadors:[]
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.coordinador.usuarioIngresa="user1";
                $scope.coordinador.fechaIngreso=new Date();
                coordinadorRemoteResource.insert($scope.coordinador)
                .then(function(coordinadorResult) {
                    $location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };

}]);

app.controller("ListCoordinadorController", ['$scope', "coordinadors", "coordinadorRemoteResource", '$location',"$log","$route", function($scope, coordinadors, coordinadorRemoteResource, $location, $log,$route) {
        /*Se obtiene lista de coordinadores*/
        $scope.coordinadors=coordinadors;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.coordinadors.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
        
        $scope.delete=function(coordinador){
            coordinadorRemoteResource.delete(coordinador)
                .then(function(coordinadorResult) {
                    $scope.coordinadors.splice($scope.coordinadors.indexOf(coordinador),1);
                }, function(bussinessMessages) {
                    //alert("aca");
                    //$scope.bussinessMessages = bussinessMessages;
                });
        };
        /*Navegar*/
        /*$scope.coordinadorEdit=function(idCoordinador){
            $log.log("coordinadorEdit");
            $location.path("/coordinadorEdit/"+idCoordinador);
            
        };*/
}]);

app.controller("EditCoordinadorController", ['$scope',"coordinador", 'coordinadorRemoteResource', '$location',"$log","$route", function($scope,coordinador, coordinadorRemoteResource, $location, $log, $route) {
        $log.log("entrando EditCoordinadorController");
        $scope.coordinador = coordinador;
        $scope.nombreBoton="Editar";
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.coordinador.usuarioModifica="user1";
                $scope.coordinador.fechaModificacion=new Date();
                coordinadorRemoteResource.update($scope.coordinador)
                .then(function(coordinadorResult) {
                    //$location.path("coordinadorEdit"+coordinadorResult.idProducto);
                }, function(bussinessMessages) {
                    //$scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };
}]);
