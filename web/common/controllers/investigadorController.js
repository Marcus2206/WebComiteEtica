var app=angular.module("app");

app.controller("NewInvestigadorController", 
['$scope', 'investigadorRR', '$location', "$log",
 "$uibModalInstance","parametroRR","$rootScope",
 function($scope, investigadorRR, $location, $log,
 $uibModalInstance,parametroRR,$rootScope) {
        
        $scope.nombreBoton="Nuevo";
        $scope.parametros;
        $scope.filtrar=function(obj,param){
            function filterByParametro(obj) {
            if (obj.idParametro===param) {
                return obj;
              } 
            }
            return obj.filter(filterByParametro);
        };
        
        parametroRR.list().then(function(parametrosResult){
                    $scope.parametros=parametrosResult;
                    $scope.paramEspecialidadInvestigador=$scope.filtrar($scope.parametros,'P008')[0].parametroDetalles;
                }, function(bussinessMessages) {
                  $scope.bussinessMessages = bussinessMessages;
                });

        /*Se construyer el json*/
        $scope.investigador = {
            idInvestigador: "",
            apePaterno:"",
            apeMaterno:"",
            nombres:"",
            correo:"",
            paramEspecialidadInvestigador:"",
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:""
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.investigador.usuarioIngresa=$rootScope.username;
                $scope.investigador.fechaIngreso=new Date();
                investigadorRR.insert($scope.investigador)
                .then(function(investigadorResult) {
                    /*Agrega etiqueta a la lista*/
                    var listbox = document.getElementById("paramEspecialidadInvestigador");
                    var selIndex = listbox.selectedIndex;
                    var selText = listbox.options[selIndex].text;  
                    investigadorResult.paramEspecialidadInvestigador=selText;
                    
                    $uibModalInstance.dismiss(investigadorResult);
                }, function(bussinessMessages) {
                    $scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };
        
        $scope.cerrar = function() {
            $uibModalInstance.dismiss('cancel');
        };

}]);

app.controller("ListInvestigadorController", 
['$scope', "investigadors", "investigadorRR", 
 '$location',"$log","$route","$uibModal",'$confirm',
 function($scope, investigadors, investigadorRR, 
 $location, $log,$route,$uibModal,$confirm) {
        /*Se obtiene lista de coordinadores*/
        $scope.investigadors=investigadors;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.investigadors.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
       
        $scope.eliminar=function(investigador){
            //Se prepara confirm
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Investigador"
                },
                {size:'sm',
                 backdrop:'static'
                })
            .then(function() {
                //Si se presiona Sí.
                investigadorRR.delete(investigador)
                .then(function(investigadorResult) {
                    //Se la elimenación es exitosa.
                    $scope.investigadors.splice($scope.investigadors.indexOf(investigador),1);
                }, function(bussinessMessages) {
                    alert("El investigador esta asociado a una investigación activa.");
                });
            })
            .catch(function(){
                //Si se presiona no, se cancela.
            });
        };
        
        /*Editar un registro*/
        $scope.editarModal = function (investigadorObj) {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'investigador/investigadorEdit.html',
                    controller: "EditInvestigadorController",
                    size: 'md',
                    backdrop  : 'static',
                    keyboard  : false,
                    resolve: {
                        investigador:function() {
                          return investigadorRR.get(investigadorObj.idInvestigador);
                        }
                    }
                });
                
                modalInstance.result.then(function(){   
                    //Si no se devuelve nada
                },function(data){
                    //Si devuelve un objeto
                    if(data !== "cancel"){
                        if(data !== "backdrop click"){
                            if(data!=="escape key press"){
                                //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                                var index = $scope.investigadors.indexOf(investigadorObj);
                                if (index !== -1) {
                                    $scope.investigadors[index] = data;
                                }
                            }
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
        
        /*Ingresar un registro*/
        $scope.insertarModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'investigador/investigadorEdit.html',
                    controller: "NewInvestigadorController",
                    size: 'md',
                    backdrop  : 'static',
                    keyboard  : false
                });
                
                modalInstance.result.then(function(){   
                    //Si no devuelve nada.
                },function(data){
                    //Si devuelve algo
                    if(data !== "cancel"){
                        if(data !== "backdrop click"){
                            if(data!=="escape key press"){
                                /*añade a la lista sin recargar la página*/
                                $scope.investigadors.push(data);
                            }
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
}]);

app.controller("EditInvestigadorController", 
['$scope',"investigador", 'investigadorRR', 
 '$location',"$log","$route","$uibModalInstance", 
 "parametroRR","$rootScope",
 function($scope,investigador, investigadorRR, 
 $location, $log, $route,$uibModalInstance,
 parametroRR,$rootScope) {
    $scope.parametros;
    $scope.filtrar=function(obj,param){
        function filterByParametro(obj) {
        if (obj.idParametro===param) {
            return obj;
          } 
        }
        return obj.filter(filterByParametro);
    };

    parametroRR.list().then(function(parametrosResult){
                $scope.parametros=parametrosResult;
                $scope.paramEspecialidadInvestigador=$scope.filtrar($scope.parametros,'P008')[0].parametroDetalles;
            }, function(bussinessMessages) {
              $scope.bussinessMessages = bussinessMessages;
            });

    $scope.investigador = investigador;

    $scope.guardar = function() {
        //if ($scope.form.$valid) {
            $scope.investigador.usuarioModifica=$rootScope.username;
            $scope.investigador.fechaModificacion=new Date();
            investigadorRR.update($scope.investigador)
            .then(function(investigadorResult) {
                /*Agrega etiqueta a la lista*/
                var listbox = document.getElementById("paramEspecialidadInvestigador");
                var selIndex = listbox.selectedIndex;
                var selText = listbox.options[selIndex].text;  
                investigadorResult.paramEspecialidadInvestigador=selText;
                    
                //Devuelve objeto actualizado y cierra modal
                $uibModalInstance.dismiss(investigadorResult);                    
            }, function(bussinessMessages) {
                //$scope.bussinessMessages = bussinessMessages;
            });
        /*} else {
            alert("Hay datos inválidos");
        }*/
    };

    $scope.cerrar = function() {
        //Se devuelve cancel
        $uibModalInstance.dismiss('cancel');
    };
}]);
