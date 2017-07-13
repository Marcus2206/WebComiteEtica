/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.controller("subirController", function ($scope, $http,$log) {
    $scope.archivoPS=null;
    $scope.subirArch = function () {
        var obj = document.getElementById("fichero").files;
        $log.log(obj);
        $http.post("http://localhost:8080/RestComiteEtica" + '/api/greet', obj)
                .then(function (data) {
                    alert("Exito");
                    $log.log(data);
                }).catch(function (data) {
                    alert("error");
                    $log.log(data);
        });
    }
    
    
})

