var app = angular.module("app");

app.controller('loginController', function ($scope, auth, $log, $rootScope, SweetAlert)
{
    //la función login que llamamos en la vista llama a la función
    //login de la factoria auth pasando lo que contiene el campo
    //de texto del formulario
    $scope.login = function () {
//        if(.login($scope,$scope.username, $scope.password)){
//            SweetAlert.swal("Bienvenido","","success");
//        }else{
//            SweetAlert.swal("Credenciales incorrectas","Por favor, intente nuevamente.","warning");
//        }
        auth.login($scope, $scope.username, $scope.password, SweetAlert);

    };
});


