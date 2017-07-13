var app=angular.module("app");

app.controller("NewCroController", ['$scope', 'croRR', '$location',"$log","$uibModalInstance", function($scope, croRR, $location, $log,$uibModalInstance) {
        
        $scope.nombreBoton="Nuevo";
        
        /*Se construyer el json*/
        $scope.cro = {
            idCro: "",
            nombre:"",
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:null,
            fechaModificacion:null
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.cro.usuarioIngresa="user1";
                $scope.cro.fechaIngreso=new Date();
                croRR.insert($scope.cro)
                .then(function(croResult) {
                    //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                    $uibModalInstance.dismiss(croResult);
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

app.controller("ListCroController", 
['$scope', "cros", "croRR", '$location',"$log","$route",
 "$uibModal",'$confirm',
 function($scope, cros, croRR, $location, $log,$route,
 $uibModal,$confirm) {
        /*Se obtiene lista de coordinadores*/
        $scope.cros=cros;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.cros.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
       
        $scope.eliminar=function(cro){
            //Se prepara confirm
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Cro"
                },
                {size:'sm',
                 backdrop:'static'
                })
            .then(function() {
                //Si se presiona Sí.
                croRR.delete(cro)
                .then(function(croResult) {
                    //Se la elimenación es exitosa.
                    $scope.cros.splice($scope.cros.indexOf(cro),1);
                }, function(bussinessMessages) {
                    alert("El cro esta asociado a una investigación activa.");
                });
            })
            .catch(function(){
                //Si se presiona no, se cancela.
            });
        };
        
        /*Editar un registro*/
        $scope.editarModal = function (croObj) {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'cro/croEdit.html',
                    controller: "EditCroController",
                    size: 'md',
                    resolve: {
                        cro:function() {
                          return croRR.get(croObj.idCro);
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
                                var index = $scope.cros.indexOf(croObj);
                                if (index !== -1) {
                                $scope.cros[index] = data;
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
                    templateUrl: 'cro/croEdit.html',
                    controller: "NewCroController",
                    size: 'md'
                });
                
                modalInstance.result.then(function(){   
                    //Si no devuelve nada.
                },function(data){
                    //Si devuelve algo
                    if(data !== "cancel"){
                        if(data !== "backdrop click"){
                                if(data!=="escape key press"){
                                /*añade a la lista sin recargar la página*/
                                $scope.cros.push(data);
                            }
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
}]);

app.controller("EditCroController", 
['$scope',"cro", 'croRR', '$location',"$log",
 "$route","$uibModalInstance", 
 function($scope, cro, croRR, $location, $log,
 $route,$uibModalInstance) {
        $scope.cro = cro;
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.cro.usuarioModifica="user1";
                $scope.cro.fechaModificacion=new Date();
                croRR.update($scope.cro)
                .then(function(croResult) {
                    //Devuelve objeto actualizado y cierra modal
                    $uibModalInstance.dismiss(croResult);                    
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
