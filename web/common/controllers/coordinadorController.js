var app=angular.module("app");

app.controller("NewCoordinadorController", ['$scope', 'coordinadorRemoteResource', '$location',"$log","$uibModalInstance", function($scope, coordinadorRemoteResource, $location, $log,$uibModalInstance) {
        
        $scope.nombreBoton="Nuevo";
        
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
                $scope.coordinador.usuarioIngresa="user1";
                $scope.coordinador.fechaIngreso=new Date();
                coordinadorRemoteResource.insert($scope.coordinador)
                .then(function(coordinadorResult) {
                    //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                    $uibModalInstance.dismiss(coordinadorResult);
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

app.controller("ListCoordinadorController", ['$scope', "coordinadors", "coordinadorRemoteResource", '$location',"$log","$route","$uibModal",'$confirm',function($scope, coordinadors, coordinadorRemoteResource, $location, $log,$route,$uibModal,$confirm) {
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
        
        $scope.eliminar=function(coordinador){
            coordinadorRemoteResource.delete(coordinador)
                .then(function(coordinadorResult) {
                    $scope.coordinadors.splice($scope.coordinadors.indexOf(coordinador),1);
                }, function(bussinessMessages) {
                    //alert("aca");
                    //$scope.bussinessMessages = bussinessMessages;
                });
        };
        /*Navegar*/
        /*$scope.coordinadorEdit=function(idCoordinador){
            $log.log("coordinadorEdit");
            $location.path("/coordinadorEdit/"+idCoordinador);
            
        };*/
        
        /*Editar un registro*/
        $scope.editarModal = function (coordinadorObj) {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'coordinador/coordinadorEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                    controller: "EditCoordinadorController",
                    size: 'sm',
                    resolve: {
                        coordinador:function() {
                          return coordinadorRemoteResource.get(coordinadorObj.idCoordinador);
                        }
                    }
                });
                
                modalInstance.result.then(function(){   
                    //on ok button press 
//                    $log.log("data 1");
//                    $log.log(data);
                },function(data){
//                    $log.log("data 2");
//                    console.log(1,data);
                    //on cancel button press
                    if(data !== "cancel"){
                        //console.log("Modal Closed");
                        $log.log("no es cancel");
//                        $log.log(data);
                        
                        var index = $scope.coordinadors.indexOf(coordinadorObj);
//                        $log.log(coordinadorObj);
                        if (index !== -1) {
                            $scope.coordinadors[index] = data;
                        }
                    }else{
                        //$log.log(data);
//                        var index = $scope.coordinadors.indexOf(coordinador);
//                        if (index !== -1) {
//                            $scope.coordinadors[index] = data;
//                        }
                        $log.log("es cancel");
                        $log.log(data);
                    }
                });
                

        };
        
        /*Ingresar un registro*/
        $scope.insertarModal = function () {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'coordinador/coordinadorEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                    controller: "NewCoordinadorController",
                    size: 'sm'
                });
                
                modalInstance.result.then(function(){   
                    //on ok button press 
//                    $log.log("data 1");
//                    $log.log(data);
                },function(data){
//                    $log.log("data 2");
//                    console.log(1,data);
                    //on cancel button press
                    if(data !== "cancel"){
                        //console.log("Modal Closed");
//                        $log.log("no es cancel");
//                        $log.log(data);
                        /*añade a la lista sin recargar la página*/
                        $scope.coordinadors.push(data);
//                        var index = $scope.coordinadors.indexOf(coordinadorObj);
////                        $log.log(coordinadorObj);
//                        if (index !== -1) {
//                            $scope.coordinadors[index] = data;
//                        }
                    }else{
                        //$log.log(data);
//                        var index = $scope.coordinadors.indexOf(coordinador);
//                        if (index !== -1) {
//                            $scope.coordinadors[index] = data;
//                        }
//                        $log.log("es cancel");
//                        $log.log(data);
                    }
                });
                

        };
  
  
}]);

app.controller("EditCoordinadorController", ['$scope',"coordinador", 'coordinadorRemoteResource', '$location',"$log","$route","$uibModalInstance", function($scope,coordinador, coordinadorRemoteResource, $location, $log, $route,$uibModalInstance) {
        $scope.coordinador = coordinador;
//        $scope.nombreBoton="Editar";
//        $log.log(coordinador);
//        $log.log("entró EditCoordinadorController ");
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.coordinador.usuarioModifica="user1";
                $scope.coordinador.fechaModificacion=new Date();
                coordinadorRemoteResource.update($scope.coordinador)
                .then(function(coordinadorResult) {
                    //$location.path("coordinadorEdit"+coordinadorResult.idProducto);
//                    $uibModalInstance.result.then(function(submitvar){
//                        $log.log(submitvar);
//                    });
//                    $log.log(coordinadorResult);
                    $uibModalInstance.dismiss(coordinadorResult);
//                    $uibModalInstance.result.then(function(){
//                        //on ok button press 
//                        alert('si');
//                    },function(data){
//                        console.log(1,data);
//                        //on cancel button press
//                        if(data && data !== "cancel")
////                        $scope.Catalogs = data;
//                        console.log("Modal Closed");
//                    });
                    
                }, function(bussinessMessages) {
                    //$scope.bussinessMessages = bussinessMessages;
                });
            /*} else {
                alert("Hay datos inválidos");
            }*/
        };
        
        $scope.cerrar = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
