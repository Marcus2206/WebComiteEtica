var app=angular.module("app");

app.controller("EditInvestigacionController", ['$scope', 'investigacion','parametros','investigacionRemoteResource','coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource', '$location',"$log", '$filter', function($scope, investigacion, parametros, investigacionRemoteResource,coordinadorRemoteResource,investigacionCoordinadorRemoteResource, $location, $log, $filter) {
        
        $scope.parametros=parametros;
        
        $scope.investigacionCoordinadors=[];
        $scope.nombreBoton="Editar";
        $scope.deshabilitado=false;
        $scope.coordinadorsSelectList=[];
        $scope.coordinadorSelect={};
        
        $scope.filtrar=function(obj,param){
            function filterByParametro(obj) {
            if (obj.idParametro===param) {
                return obj;
              } 
            }
            return obj.filter(filterByParametro);
        };
        
        $scope.mostrarParam=function(obj,param){
            function filterByParametroDetalle(obj) {
            if (obj.id.idParametroDetalle===param) {
                return obj;
              } 
            }
            return obj.filter(filterByParametroDetalle);
        };
        
        $scope.paramEspecialidad=$scope.filtrar($scope.parametros,'P003')[0].parametroDetalles;
        $scope.paramFase=$scope.filtrar($scope.parametros,'P005')[0].parametroDetalles;
        $scope.paramTipoInvestigacion=$scope.filtrar($scope.parametros,'P004')[0].parametroDetalles;

        $scope.investigacion = investigacion;
        //investigacion.paramEspecialidad
//        $scope.showParam = function(parametro,detalle) {
//            return $scope.filtrar(parametro)
//        };

        $scope.showParam = function(obj,param) {
            var seleccionado=$scope.mostrarParam(obj,param);
            if(seleccionado.length>0){
                return seleccionado[0].descripcion;
            }else{
                return '';
            }
            
        };
  
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
                    $scope.investigacionCoordinadors=coordinadorsRespond;
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                    //Mensaje de error
                });
        
        $scope.agregarCoordinador=function(){
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
            
            investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
              .then(function (invCoordRespond){
                    var ic=$scope.investigacionCoordinador;
                    var c=$scope.coordinadorSelect;
                    var invCoordinador=[
                                        ic,
                                        c
                                        ];
                                     
                    $scope.investigacionCoordinadors.push(invCoordinador);
                    $scope.coordinadorsSelectList.splice($scope.coordinadorsSelectList.indexOf($scope.coordinadorSelect),1);
                    $scope.coordinadorSelect={}; 
                    $scope.coordinadorSelect.observacion="";
            },function(bussinessMessages){

            });
        };
        
        $scope.eliminarInvCoordinador=function(invCoordinador){
            investigacionCoordinadorRemoteResource.delete(invCoordinador[0])
              .then(function (invCoordinadorRespond){  
                    $scope.coordinadorsSelectList.push(invCoordinador[1]);
                    $scope.investigacionCoordinadors.splice($scope.investigacionCoordinadors.indexOf(invCoordinador),1);
            },function(bussinessMessages){

            });
        };
        
        $scope.actualizarInvCoordinador=function(invCoordinador){
            investigacionCoordinadorRemoteResource.update(invCoordinador[0])
              .then(function (invCoordinadorRespond){
                  
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

app.controller("NewInvestigacionController", ['$scope', 'investigacionRemoteResource', 'parametros', '$location',"$log", function($scope, investigacionRemoteResource, parametros, $location, $log) {
        $scope.filtrar=function(obj,param){
            function filterByParametro(obj) {
            if (obj.idParametro===param) {
                return obj;
              } 
            }
            return obj.filter(filterByParametro);
        };
        
        $scope.nombreBoton="Nuevo";
        $scope.deshabilitado=true;
        $scope.parametros=parametros;
        $scope.paramEspecialidad=$scope.filtrar($scope.parametros,'P003')[0].parametroDetalles;
        $scope.paramFase=$scope.filtrar($scope.parametros,'P005')[0].parametroDetalles;
        $scope.paramTipoInvestigacion=$scope.filtrar($scope.parametros,'P004')[0].parametroDetalles;
        
//        
//        $log.log("final ");
//        $log.log($scope.paramTipoInvestigacion);
//        $log.log($scope.paramTipoInvestigacion[0].id);
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