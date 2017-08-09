/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("app");

app.controller("MainController", ['$scope', '$log', "$rootScope", "$cookies", "auth", function ($scope, $log, $rootScope, $cookies, auth) {
        $('#myCarousel').carousel({
            interval: 2000
        });
//        $rootScope.muestra = true;

//        $scope.user = $rootScope.username;
        $scope.logout = function () {
            auth.logout();
//            $scope.user = "";
            $rootScope.usernam="";
            $rootScope.muestra = true;
            window.location.reload();
        };


    }]);