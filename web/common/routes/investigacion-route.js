var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");

    $routeProvider.when('/investigacionList', {
       templateUrl: "investigacion/investigacionList.html",
       controller: "ListInvestigacionController",
       resolve:{
            investigacions:['investigacionRemoteResource',function(investigacionRemoteResource) {
                return investigacionRemoteResource.list();
            }]
       }
     });
}]);

