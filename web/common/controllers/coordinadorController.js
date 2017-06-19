var app=angular.module("app");

app.controller("NewCoordinadorController", ['$scope', 'coordinadorRemoteResource', '$location',"$log", function($scope, coordinadorRemoteResource, $location, $log) {
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
                coordinadorRemoteResource.insert($scope.coordinador)
                .then(function(coordinadorResult) {
                    //$location.path("coordinadorEdit"+coordinadorResult.idProducto);
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
        
        /*Navegar*/
        $scope.coordinadorEdit=function(idCoordinador){
            /*var paramValue = $route.current.$$route.paramExample;
            $log.log(paramValue); */
            $route.current.$$route.paramExample=idCoordinador;
            $log.log("dfsfsdf "+idCoordinador);
            
            var route={
                controller :"EditCoordinadorController",
                templateUrl: "coordinador/coordinadorEdit.html",
                paramExample:idCoordinador
                        
            };
            $location.path("/coordinadorEdit",route);
            
        };
}]);

app.controller("EditCoordinadorController", ['$scope', 'coordinadorRemoteResource', '$location',"$log","$route", function($scope, coordinadorRemoteResource, $location, $log, $route) {
        $log.log("entrando EditCoordinadorController");
        //$scope.coordinador = coordinador;
        
        var paramValue = $route.current.$$route.paramExample;
            $log.log(paramValue);
        /*
        $scope.otroGato=function(){
            $log.log("dio click");
            
            var invCoordinadorId={
                idInvestigacion:"INV1700001",
                idCoordinador: "COD1700002"
            };
            
            coordinadorRemoteResource.get(invCoordinadorId)
                .then(function(invCoordinadorRespond) {
                    $log.log("get invCoordinadorId");
                    $log.log(invCoordinadorRespond);

                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
        };*/
}]);
