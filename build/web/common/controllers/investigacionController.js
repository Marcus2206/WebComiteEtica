var app=angular.module("app");

app.controller("EditInvestigacionController", ['$scope', 'investigacion', 'investigacionRemoteResource','coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource', '$location',"$log", function($scope, investigacion, investigacionRemoteResource,coordinadorRemoteResource,investigacionCoordinadorRemoteResource, $location, $log) {
        $scope.investigacion = investigacion;
        $scope.investigacionCoordinadors=[];
        $scope.nombreBoton="Editar";
        $scope.coordinadorsSelectList=[];
        $scope.coordinadorSelect={};
        
        $scope.guardar=function(){
            $scope.investigacion.usuarioModifica="sa";
            $scope.investigacion.fechaModificacion=new Date();
            investigacionRemoteResource.update($scope.investigacion)
                .then(function(investigacionRespond) {
                    //Mensaje de éxito
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                    //Mensaje de error
                });
        };
        
        coordinadorRemoteResource.listCoordinadorSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
                .then(function(coordinadorsRespond) {
                    $scope.coordinadorsSelectList=coordinadorsRespond;
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                    //Mensaje de error
                });
        
        investigacionCoordinadorRemoteResource.listCoordinadorByIdInvestigacion($scope.investigacion.idInvestigacion)
                .then(function(coordinadorsRespond) {
                    //$scope.coordinadors=coordinadorsRespond;
//                    $log.log("coordinadorsRespond[0]");
//                    $log.log(coordinadorsRespond[0]);
//                    $log.log("coordinadorsRespond[0][0]");
//                    $log.log(coordinadorsRespond[0][0]);
                    $scope.investigacionCoordinadors=coordinadorsRespond;
//                    $log.log("coordinadorsRespond[1]");
//                    $log.log(coordinadorsRespond[1]);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                    //Mensaje de error
                });
        
        
//        coordinadorRemoteResource.listCoordinadorSinIdInvestigacionFind($scope.investigacion.idInvestigacion)
//        .then(function(coordinadorsRespond) {
//            $scope.coordinadors=coordinadorsRespond;
//        }, function(bussinessMessages) {
//            $scope.bussinessMessages = bussinessMessages;
//            //Mensaje de error
//        });
        $scope.agregarCoordinador=function(){
            //$log.log($scope.coordinador);
            $scope.investigacionCoordinador={id:{ idInvestigacion:"",
                                              idCoordinador:""},
                                        observacion:"",
                                        usuarioIngresa:null,
                                        fechaIngreso:null};
                                    
            $scope.investigacionCoordinador.id.idInvestigacion=$scope.investigacion.idInvestigacion;
            $scope.investigacionCoordinador.id.idCoordinador=$scope.coordinadorSelect.idCoordinador;
            $scope.investigacionCoordinador.observacion=$scope.coordinadorSelect.observacion;
            $scope.investigacionCoordinador.usuarioIngresa="sa";
            $scope.investigacionCoordinador.fechaIngreso=new Date();
            
            $log.log($scope.coordinadorSelect);
            investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
              .then(function (invCoordRespond){
                    var ic=$scope.investigacionCoordinador;
                    var c=$scope.coordinadorSelect;
                    var invCoordinador=[
                                        ic,
                                        c
                                        ];
                    
                    $log.log($scope.investigacionCoordinadors[0]);
                    $log.log(invCoordinador);                   
                    $scope.investigacionCoordinadors.push(invCoordinador);
                    $scope.coordinadorsSelectList.splice($scope.coordinadorsSelectList.indexOf($scope.coordinadorSelect),1);
                    $scope.coordinadorSelect={}; 
                    $scope.coordinadorSelect.observacion="";
            },function(bussinessMessages){

            });
        };
}]);

app.controller("ListInvestigacionController", ['$scope', "investigacions", "investigacionRemoteResource", '$location',"$log","$route", function($scope, investigacions, investigacionRemoteResource, $location, $log,$route) {
        /*Se obtiene lista de coordinadores*/
        $scope.investigacions=investigacions;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.investigacions.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
        
        
        $scope.delete=function(investigacion){
            investigacionRemoteResource.delete(investigacion)
                .then(function(investigacionResult) {
                    $scope.investigacions.splice($scope.investigacions.indexOf(investigacion),1);
                    //Mensaje de éxito
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                    //Mensaje de error
                });
        };
        
}]);

app.controller("NewInvestigacionController", ['$scope', 'investigacionRemoteResource', '$location',"$log", function($scope, investigacionRemoteResource, $location, $log) {
        
        $scope.nombreBoton="Nuevo";
        
        /*Se construyer el json*/
        $scope.investigacion = {
            idInvestigacion: "" ,
            protocolo:"",
            titulo:"",
            paramEspecialidad:"",
            paramFase:"",
            paramTipoInvestigacion:"",
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:""//,
//            investigacionMonitors:[],
//            investigacionCoordinadors:[],
//            investigacionInvestigadors:[],
//            registros:[],
//            investigacionSedes:[]
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.investigacion.usuarioIngresa="user1";
                $scope.investigacion.fechaIngreso=new Date();
                investigacionRemoteResource.insert($scope.investigacion)
                .then(function(investigacionResult) {
                    $location.path("investigacionEdit/"+investigacionResult.idInvestigacion);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };

}]);