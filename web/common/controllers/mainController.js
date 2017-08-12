/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("app");

app.controller("MainController", ['$scope', '$log', "$rootScope", "auth", "localStorageService", function ($scope, $log, $rootScope, auth, localStorageService) {
        $('#myCarousel').carousel({
            interval: 2000
        });
        if (localStorageService.get("mostrar") !== null) {
            $rootScope.muestra = localStorageService.get("mostrar");
        }else{
            localStorageService.set("mostrar",true);
            $rootScope.muestra = true;
        }
        if (localStorageService.get("rolUsuario") !== null) {
            $rootScope.rolUsuario = localStorageService.get("rolUsuario");
        }else{
            localStorageService.set("rolUsuario","");
            $rootScope.rolUsuario ="";
        }
        if (localStorageService.get("usuario") !== null) {
            $rootScope.username = localStorageService.get("usuario");
        }else{
            localStorageService.set("usuario","");
            $rootScope.username ="";
        }



//        $scope.user = $rootScope.username;
        $scope.logout = function () {
            auth.logout();
//            $scope.user = "";
            $rootScope.username = "";
            $rootScope.muestra = true;
            window.location.reload();
        };


    }]);