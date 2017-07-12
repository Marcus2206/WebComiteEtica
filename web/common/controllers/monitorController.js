var app=angular.module("app");

app.controller("NewMonitorController", ['$scope', 'monitorRR', '$location',"$log","$uibModalInstance", function($scope, monitorRR, $location, $log,$uibModalInstance) {
        
        $scope.nombreBoton="Nuevo";
        
        /*Se construyer el json*/
        $scope.monitor = {
            idMonitor: "",
            apePaterno:"",
            apeMaterno:"",
            nombres:"",
            correo:"",
            usuarioIngresa:"",
            fechaIngreso:"",
            usuarioModifica:"",
            fechaModificacion:""
        };
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.monitor.usuarioIngresa="user1";
                $scope.monitor.fechaIngreso=new Date();
                monitorRR.insert($scope.monitor)
                .then(function(monitorResult) {
                    //$location.path("coordinadorEdit/"+coordinadorResult.idCoordinador);
                    $uibModalInstance.dismiss(monitorResult);
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

app.controller("ListMonitorController", ['$scope', "monitors", "monitorRR", '$location',"$log","$route","$uibModal",'$confirm',function($scope, monitors, monitorRR, $location, $log,$route,$uibModal,$confirm) {
        /*Se obtiene lista de coordinadores*/
        $scope.monitors=monitors;

        /*Se setea la cantidad filas por vista*/
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        
        /*Calculando número de páginas*/
        $scope.numberOfPages=function(){
            return Math.ceil($scope.monitors.length/$scope.pageSize);                
        };
        
        /*Ir a la sgte página*/
        $scope.setNextPagina=function(){
            $scope.currentPage=$scope.currentPage+1;
            return $scope.currentPage;
        };
       
        $scope.eliminar=function(monitor){
            //Se prepara confirm
            $confirm({
                text: '¿Está seguro de eliminar este registro?',
                ok:"Sí",
                cancel:"No",
                title:"Eliminar Monitor"
                },
                {size:'sm',
                 backdrop:'static'}
                )
            .then(function() {
                //Si se presiona Sí.
                monitorRR.delete(monitor)
                .then(function(monitorResult) {
                    //Se la elimenación es exitosa.
                    $scope.monitors.splice($scope.monitors.indexOf(monitor),1);
                }, function(bussinessMessages) {
                    alert("El monitor esta asociado a una investigación activa.");
                });
            })
            .catch(function(){
                //Si se presiona no, se cancela.
            });
        

        };
        
        /*Editar un registro*/
        $scope.editarModal = function (monitorObj) {
            //alert(idCoordinador);
                var modalInstance = $uibModal.open({
                    templateUrl: 'monitor/monitorEdit.html',
//                    templateUrl: 'coordinador/coordinadorTest.html',
                    controller: "EditMonitorController",
                    size: 'md',
                    backdrop  : 'static',
                    keyboard  : false,
                    resolve: {
                        monitor:function() {
                          return monitorRR.get(monitorObj.idMonitor);
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
                                var index = $scope.monitors.indexOf(monitorObj);
                                if (index !== -1) {
                                    $scope.monitors[index] = data;
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
                    templateUrl: 'monitor/monitorEdit.html',
                    controller: "NewMonitorController",
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
                                $scope.monitors.push(data);
                            }
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
}]);

app.controller("EditMonitorController", ['$scope',"monitor", 'monitorRR', '$location',"$log","$route","$uibModalInstance", function($scope, monitor, monitorRR, $location, $log, $route,$uibModalInstance) {
        $scope.monitor = monitor;
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.monitor.usuarioModifica="user1";
                $scope.monitor.fechaModificacion=new Date();
                monitorRR.update($scope.monitor)
                .then(function(monitorResult) {
                    //Devuelve objeto actualizado y cierra modal
                    $uibModalInstance.dismiss(monitorResult);                    
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
