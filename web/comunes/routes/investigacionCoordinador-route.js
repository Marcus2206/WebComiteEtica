var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
}]);
