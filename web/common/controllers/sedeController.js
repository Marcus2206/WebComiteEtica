var app=angular.module("app");

app.controller("NewSedeController", ['$scope', 'sedeRR', '$location',"$log","$uibModalInstance","ubigeoRR", function($scope, sedeRR, $location, $log, $uibModalInstance,ubigeoRR) {

        $scope.departamentos;
        $scope.provincias;
        $scope.distritos;
        
        ubigeoRR.getDepartamentoList()
                              .then(function(ubigeoResult){
                                  $scope.departamentos=ubigeoResult;
                              }, function(bussinessMessages) {
                                $scope.bussinessMessages = bussinessMessages;
                              });
        
        $scope.cargarProvincia=function(){
            $scope.sede.idProvincia=null;
            $scope.sede.idDistrito=null;
            $scope.distritos=[];
            ubigeoRR.getProvinciaByDepartamento($scope.sede.idDepartamento)
                .then(function(ubigeoResult){
                    $scope.provincias=ubigeoResult;
                }, function(bussinessMessages) {
                  $scope.bussinessMessages = bussinessMessages;
                });
        };
        
        $scope.cargarDistrito=function(){
            $scope.sede.idDistrito=null;
            ubigeoRR.getDistritoByDepartamentoProvincia($scope.sede.idDepartamento,$scope.sede.idProvincia)
                .then(function(ubigeoResult){
                    $scope.distritos=ubigeoResult;
                }, function(bussinessMessages) {
                  $scope.bussinessMessages = bussinessMessages;
                });
        };
        
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
                    var listbox = document.getElementById("idDepartamento");
                    var selIndex = listbox.selectedIndex;
                    var selText = listbox.options[selIndex].text;  
                    sedeResult.idDepartamento=selText;
                    listbox = document.getElementById("idProvincia");
                    selIndex = listbox.selectedIndex;
                    selText = listbox.options[selIndex].text; 
                    sedeResult.idProvincia=selText;
                    listbox = document.getElementById("idDistrito");
                    selIndex = listbox.selectedIndex;
                    selText = listbox.options[selIndex].text; 
                    sedeResult.idDistrito=selText;
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
        $log.log("ListSedeController");
        $log.log(sedes);
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
                title:"Eliminar Sede"
                },
                {size:'sm',
                 backdrop:'static'}
                )
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
                    backdrop  : 'static',
                    keyboard  : false,
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
                        if(data !== "backdrop click"){
                            if(data !== "escape key press"){
                                //Si no es cancel, se reemplaza el objeto que se mandó a actualizar
                                var index = $scope.sedes.indexOf(sedeObj);
                                if (index !== -1) {
                                    $scope.sedes[index] = data;
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
                    templateUrl: 'sede/sedeEdit.html',
                    controller: "NewSedeController",
                    size: 'sm',
                    backdrop  : 'static',
                    keyboard  : false
                });
                
                modalInstance.result.then(function(){
                    //Si no devuelve nada.
                },function(data){
                    //Si devuelve algo
                    if(data !== "cancel"){
                        if(data !== "backdrop click"){
                            if(data !== "escape key press"){
                                /*añade a la lista sin recargar la página*/
                                $scope.sedes.push(data);
                            }
                        }
                    }else{
                        //Si es cancel
                    }
                });
        };
}]);

app.controller("EditSedeController", ['$scope',"sede", 'sedeRR', '$location',"$log","$route","$uibModalInstance","ubigeoRR", function($scope, sede, sedeRR, $location, $log, $route,$uibModalInstance,ubigeoRR) {
        $scope.departamentos;
        $scope.provincias;
        $scope.distritos;
        $scope.first=true;
                
        $scope.cargarDistrito=function(){
            if(!$scope.first){
                $scope.sede.idDistrito=null;
            };
            ubigeoRR.getDistritoByDepartamentoProvincia($scope.sede.idDepartamento,$scope.sede.idProvincia)
                .then(function(ubigeoResult){
                    $scope.distritos=ubigeoResult;
                }, function(bussinessMessages) {
                  $scope.bussinessMessages = bussinessMessages;
                });
        };
        
        $scope.cargarProvincia=function(){
            if(!$scope.first){
                $scope.sede.idProvincia=null;
                $scope.sede.idDistrito=null;
                $scope.distritos=[];
            };
            ubigeoRR.getProvinciaByDepartamento($scope.sede.idDepartamento)
                .then(function(ubigeoResult){
                    $scope.provincias=ubigeoResult;
                }, function(bussinessMessages) {
                  $scope.bussinessMessages = bussinessMessages;
                });
        };
        
        $scope.cargarDepartamento=function(){
            ubigeoRR.getDepartamentoList()
                .then(function(ubigeoResult){
                    $scope.departamentos=ubigeoResult;
                }, function(bussinessMessages) {
                  $scope.bussinessMessages = bussinessMessages;
                });
        };
        
        $scope.cargarDepartamento();
        
        $scope.sede = sede;  

        if($scope.sede.idDepartamento!==null){
            $scope.cargarProvincia();
            if($scope.sede.idProvincia!==null){
                $scope.cargarDistrito();
            }
        }
        $scope.first=false;
        
        $scope.guardar = function() {
            //if ($scope.form.$valid) {
                $scope.sede.usuarioModifica="user1";
                $scope.sede.fechaModificacion=new Date();
                sedeRR.update($scope.sede)
                .then(function(sedeResult) {
                    //Devuelve objeto actualizado y cierra modal
                    var listbox = document.getElementById("idDepartamento");
                    var selIndex = listbox.selectedIndex;
                    var selText = listbox.options[selIndex].text;  
                    sedeResult.idDepartamento=selText;
                    listbox = document.getElementById("idProvincia");
                    selIndex = listbox.selectedIndex;
                    selText = listbox.options[selIndex].text; 
                    sedeResult.idProvincia=selText;
                    listbox = document.getElementById("idDistrito");
                    selIndex = listbox.selectedIndex;
                    selText = listbox.options[selIndex].text; 
                    sedeResult.idDistrito=selText;
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
