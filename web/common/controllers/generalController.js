var app=angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.controller("subirController", function ($scope, $http,$log) {
//    $scope.archivoPS=null;
//    $scope.subirArch = function () {
//        var obj = document.getElementById("fichero").files;
//        $log.log(obj);
//        $http.post("http://localhost:8080/RestComiteEtica" + '/api/greet', obj)
//                .then(function (data) {
//                    alert("Exito");
//                    $log.log(data);
//                }).catch(function (data) {
//                    alert("error");
//                    $log.log(data);
//        });
//    };
    
        $scope.envia=function(){
            $log.log("entra");
            $http.post("http://localhost:8080/RestComiteEtica/file/Nada")
                    .then(function (data){
                        alert("listo");
                    })
                    .catch(function (data){
                        alert("error");
                    });
        };
    
});

