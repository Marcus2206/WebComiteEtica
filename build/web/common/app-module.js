var app=angular.module("app",["ngRoute","xeditable","ui.select"]);

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
 /*Sólo ruta por defecto*/
 $locationProvider.hashPrefix("");
  $routeProvider.when('/', {
    templateUrl: "main.html",
    controller: "MainController"
  }); 
 
  $routeProvider.otherwise({
        redirectTo: '/'
  });   
 
}]);