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
            $log.log("antes de guardar, new coordinadorRemoteResource");
                coordinadorRemoteResource.insert($scope.coordinador)
                .then(function(coordinadorResult) {
                    $log.log("guardó coordinador new controller");
                    $log.log(coordinadorResult);
                    //$location.path("coordinadorEdit"+coordinadorResult.idProducto);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };

}]);

app.controller("ListCoordinadorController", ['$scope', '$location',"$log", function($scope, $location, $log) {
        $log.log("entrando ListCoordinadorControler");
}]);

app.controller("EditCoordinadorController", ['$scope', 'coordinador', 'coordinadorRemoteResource', '$location',"$log", function($scope, coordinador, coordinadorRemoteResource, $location, $log) {
        $log.log("entrando ReadInvestigacionCoordinadorController");
        $scope.coordinador = coordinador;
        
        $log.log($scope.investigacionCoordinador);
        
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
        };
}]);
