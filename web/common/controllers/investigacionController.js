/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app=angular.module("app");

app.controller("ReadInvestigacionCoordinadorController", ['$scope', 'investigacionCoordinador', 'investigacionRemoteResource', '$location',"$log", function($scope, investigacionCoordinador, investigacionRemoteResource, $location, $log) {
        $log.log("entrando ReadInvestigacionCoordinadorController");
        $scope.investigacionCoordinador = investigacionCoordinador;
        
        $log.log($scope.investigacionCoordinador);
        
        $scope.otroGato=function(){
            $log.log("dio click");
            
            var invCoordinadorId={
                idInvestigacion:"INV1700001",
                idCoordinador: "COD1700002"
            };
            
            investigacionRemoteResource.get(invCoordinadorId)
                .then(function(invCoordinadorRespond) {
                    $log.log("get invCoordinadorId");
                    $log.log(invCoordinadorRespond);

                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
        };
}]);
