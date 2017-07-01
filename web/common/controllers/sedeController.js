var app=angular.module("app");

app.controller("NewSedeController", ['$scope', 'sedeRR', '$location',"$log","$uibModalInstance", function($scope, sedeRR, $location, $log, $uibModalInstance) {

        /*Se construyer el json*/
        $scope.sede = {
            idSede: "",
            nombre:"",
            direccion:"",
            departamento:null,
            provincia:null,
            distrito:null,
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:""
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.sede.usuarioIngresa="user1";
                $scope.sede.fechaIngreso=new Date();
                sedeRR.insert($scope.sede)
                .then(function(sedeResult) {
                    //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                    $uibModalInstance.dismiss(sedeResult);
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


app.controller("ListSedeController", ['$scope', "sedes", "sedeRR", '$location',"$log","$route","$uibModal",'$confirm',function($scope, sedes, sedeRR, $location, $log,$route,$uibModal,$confirm) {
        /*Se obtiene lista de coordinadores*/
        $scope.sedes=sedes;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.sedes.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
       
        $scope.eliminar=function(sede){
            //Se prepara confirm
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Sede",
                settings:"{size: 'sm'}"
                })
            .then(function() {
                //Si se presiona Sí.
                sedeRR.delete(sede)
                .then(function(sedeResult) {
                    //Se la elimenación es exitosa.
                    $scope.sedes.splice($scope.sedes.indexOf(sede),1);
                }, function(bussinessMessages) {
                    //$scope.bussinessMessages = bussinessMessages;
                });
            })
            .catch(function(){
                //Si se presiona no, se cancela.
            });
        };
        
        /*Editar un registro*/
        $scope.editarModal = function (sedeObj) {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'sede/sedeEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                    controller: "EditSedeController",
                    size: 'sm',
                    resolve: {
                        sede:function() {
                          return sedeRR.get(sedeObj.idSede);
                        }
                    }
                });
                
                modalInstance.result.then(function(){
                    //Si no se devuelve nada
                },function(data){
                    //Si devuelve un objeto
                    if(data !== "cancel"){
                        //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                        var index = $scope.sedes.indexOf(sedeObj);
                        if (index !== -1) {
                            $scope.sedes[index] = data;
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
        
        /*Ingresar un registro*/
        $scope.insertarModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'sede/sedeEdit.html',
                    controller: "NewSedeController",
                    size: 'sm'
                });
                
                modalInstance.result.then(function(){
                    //Si no devuelve nada.
                },function(data){
                    //Si devuelve algo
                    if(data !== "cancel"){
                        /*añade a la lista sin recargar la página*/
                        $scope.sedes.push(data);
                    }else{
                        //Si es cancel
                    }
                });
        };
}]);

app.controller("EditSedeController", ['$scope',"sede", 'sedeRR', '$location',"$log","$route","$uibModalInstance", function($scope, sede, sedeRR, $location, $log, $route,$uibModalInstance) {
        $scope.sede = sede;
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.sede.usuarioModifica="user1";
                $scope.sede.fechaModificacion=new Date();
                sedeRR.update($scope.sede)
                .then(function(sedeResult) {
                    //Devuelve objeto actualizado y cierra modal
                    $uibModalInstance.dismiss(sedeResult);                    
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
