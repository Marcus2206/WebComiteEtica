var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");
    $routeProvider.when('/investigadorList', {
       templateUrl: "investigador/investigadorList.html",
       controller: "ListInvestigadorController",
       resolve:{
            investigadors:['investigadorRR',function(investigadorRR) {
                return investigadorRR.list();
            }]
       }
     });
}]);
