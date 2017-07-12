var app=angular.module("app");

app.controller("NewPatrocinadorController", 
['$scope', 'patrocinadorRR', '$location',"$log",
"$uibModalInstance", 
function($scope, patrocinadorRR, $location,$log,
$uibModalInstance) {
        
        $scope.nombreBoton="Nuevo";
        
        /*Se construyer el json*/
        $scope.patrocinador = {
            idPatrocinador: "",
            nombre:"",
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:""
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.patrocinador.usuarioIngresa="user1";
                $scope.patrocinador.fechaIngreso=new Date();
                patrocinadorRR.insert($scope.patrocinador)
                .then(function(patrocinadorResult) {
                    //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                    $uibModalInstance.dismiss(patrocinadorResult);
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

app.controller("ListPatrocinadorController", ['$scope', "patrocinadors", "patrocinadorRR", '$location',"$log","$route","$uibModal",'$confirm',function($scope, patrocinadors, patrocinadorRR, $location, $log,$route,$uibModal,$confirm) {
        /*Se obtiene lista de coordinadores*/
        $scope.patrocinadors=patrocinadors;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.patrocinadors.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
       
        $scope.eliminar=function(patrocinador){
            //Se prepara confirm
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Patrocinador"
                },
                {size:'sm',
                 backdrop:'static'
                })
            .then(function() {
                //Si se presiona Sí.
                patrocinadorRR.delete(patrocinador)
                .then(function(patrocinadorResult) {
                    //Se la elimenación es exitosa.
                    $scope.patrocinadors.splice($scope.patrocinadors.indexOf(patrocinador),1);
                }, function(bussinessMessages) {
                    alert("El patrocinador esta asociado a una investigación activa.");
                });
            })
            .catch(function(){
                //Si se presiona no, se cancela.
            });
        

        };
        
        /*Editar un registro*/
        $scope.editarModal = function (patrocinadorObj) {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'patrocinador/patrocinadorEdit.html',
                    controller: "EditPatrocinadorController",
                    size: 'md',
                    resolve: {
                        patrocinador:function() {
                          return patrocinadorRR.get(patrocinadorObj.idPatrocinador);
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
                                var index = $scope.patrocinadors.indexOf(patrocinadorObj);
                                if (index !== -1) {
                                    $scope.patrocinadors[index] = data;
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
                    templateUrl: 'patrocinador/patrocinadorEdit.html',
                    controller: "NewPatrocinadorController",
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
                                $scope.patrocinadors.push(data);
                            }
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
}]);

app.controller("EditPatrocinadorController", ['$scope',"patrocinador", 'patrocinadorRR', '$location',"$log","$route","$uibModalInstance", function($scope, patrocinador, patrocinadorRR, $location, $log, $route,$uibModalInstance) {
        $scope.patrocinador = patrocinador;
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.patrocinador.usuarioModifica="user1";
                $scope.patrocinador.fechaModificacion=new Date();
                patrocinadorRR.update($scope.patrocinador)
                .then(function(patrocinadorResult) {
                    //Devuelve objeto actualizado y cierra modal
                    $uibModalInstance.dismiss(patrocinadorResult);                    
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
