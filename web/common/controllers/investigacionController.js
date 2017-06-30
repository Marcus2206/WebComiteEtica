var app=angular.module("app");

app.controller("EditInvestigacionController", ['$scope', 'investigacion','parametros','investigacionRemoteResource','coordinadorRemoteResource', 'investigacionCoordinadorRemoteResource', '$location',"$log", '$filter',"$uibModalInstance","$confirm", function($scope, investigacion, parametros, investigacionRemoteResource,coordinadorRemoteResource,investigacionCoordinadorRemoteResource, $location, $log, $filter,$uibModalInstance,$confirm) {
        
        $scope.parametros=parametros;
        
        $scope.investigacionCoordinadors=[];
        $scope.nombreBoton="Editar";
        $scope.coordinadorsSelectList=[];
        $scope.coordinadorSelect={};
        $scope.isCoordinador=true;
        
        $scope.filtrar=function(obj,param){
            function filterByParametro(obj) {
            if (obj.idParametro===param) {
                return obj;
              } 
            }
            return obj.filter(filterByParametro);
        };
//        
//        $scope.mostrarParam=function(obj,param){
//            function filterByParametroDetalle(obj) {
//            if (obj.id.idParametroDetalle===param) {
//                return obj;
//              } 
//            }
//            return obj.filter(filterByParametroDetalle);
//        };
        
        $scope.paramEspecialidad=$scope.filtrar($scope.parametros,'P003')[0].parametroDetalles;
        $scope.paramFase=$scope.filtrar($scope.parametros,'P005')[0].parametroDetalles;
        $scope.paramTipoInvestigacion=$scope.filtrar($scope.parametros,'P004')[0].parametroDetalles;

        $scope.investigacion = investigacion;

        //investigacion.paramEspecialidad
//        $scope.showParam = function(parametro,detalle) {
//            return $scope.filtrar(parametro)
//        };

//        $scope.showParam = function(obj,param) {
//            var seleccionado=$scope.mostrarParam(obj,param);
//            if(seleccionado.length>0){
//                return seleccionado[0].descripcion;
//            }else{
//                return '';
//            }
//            
//        };
  
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
        
        /*Detalle de Investigación con Coordinador*/
        investigacionCoordinadorRemoteResource.listCoordinadorByIdInvestigacion($scope.investigacion.idInvestigacion)
                .then(function(coordinadorsRespond) {
                    $scope.investigacionCoordinadors=coordinadorsRespond;
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                    //Mensaje de error
                });
        $scope.antes=function(){ 
          $log.log('antes');
          $log.log($scope.coordinadorSelect);
        };
        $scope.agregarCoordinador=function(){
            $log.log('después');
            $log.log($scope.coordinadorSelect);
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
            $log.log($scope.investigacionCoordinador);
            investigacionCoordinadorRemoteResource.insert($scope.investigacionCoordinador)
              .then(function (invCoordRespond){
                    var ic=$scope.investigacionCoordinador;
                    var c=$scope.coordinadorSelect;
                    var invCoordinador=[ic,c];
                    
                    //$location.path("investigacionEdit/"+$scope.investigacion.idInvestigacion);                
                    $scope.investigacionCoordinadors.push(invCoordinador);
                    $scope.coordinadorsSelectList.splice($scope.coordinadorsSelectList.indexOf($scope.coordinadorSelect),1);
                    $scope.coordinadorSelect={}; 
            },function(bussinessMessages){

            });
        };         
                    
        $scope.eliminarInvCoordinador=function(invCoordinador){
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Coordinador",
                settings:"{size: 'sm'}"
                })
            .then(function(){
                investigacionCoordinadorRemoteResource.delete(invCoordinador[0])
                .then(function (invCoordinadorRespond){
                      $scope.coordinadorsSelectList.push(invCoordinador[1]);
                      $scope.investigacionCoordinadors.splice($scope.investigacionCoordinadors.indexOf(invCoordinador),1);
                },function(bussinessMessages){

                });
            })
            .catch(function(){
                
            });
    
            
            
        };
        
        $scope.actualizarInvCoordinador=function(invCoordinador){
            investigacionCoordinadorRemoteResource.update(invCoordinador[0])
              .then(function (invCoordinadorRespond){
                  
            },function(bussinessMessages){

            });
        };
        
        $scope.cerrar = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cerrarOtras = true;   
        
        $scope.prueba=function(){
            alert('1515151');
        };
}]);

app.controller("ListInvestigacionController", ['$scope', "investigacions", "investigacionRemoteResource", '$location',"$log","$route","$uibModal","$confirm", function($scope, investigacions, investigacionRemoteResource, $location, $log,$route,$uibModal,$confirm) {
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
        
        /*Editar un registro*/
        $scope.editarModal = function (investigacionObj) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'investigacion/investigacionEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                    controller: "EditInvestigacionController",
                    size: 'sm',
                    resolve: {
                        investigacion:function() {
                          return investigacionRemoteResource.get(investigacionObj.idInvestigacion);
                        },
                        parametros:['parametroRR',function(parametroRR) {
                            return parametroRR.list();
                        }]
                    }
                });
                
                modalInstance.result.then(function(){   
                    //Si no se devuelve nada
                },function(data){
                    //Si devuelve un objeto
                    if(data !== "cancel"){
                        //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                        var index = $scope.investigacions.indexOf(investigacionObj);
                        if (index !== -1) {
                            $scope.investigacions[index] = data;
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
        
        
        $scope.eliminar=function(investigacion){
            //Se prepara confirm
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Investigación",
                settings:"{size: 'sm'}"
                })
            .then(function() {
                //Si se presiona Sí.
                investigacionRemoteResource.delete(investigacion)
                .then(function(investigacionResult) {
                    //Se la elimenación es exitosa.
                    $scope.investigacions.splice($scope.investigacions.indexOf(investigacion),1);
                }, function(bussinessMessages) {
                    //$scope.bussinessMessages = bussinessMessages;
                });
            })
            .catch(function(){
                //Si se presiona no, se cancela.
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