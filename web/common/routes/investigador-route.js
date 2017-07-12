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

    $routeProvider.when('/investigadorEdit/:idInvestigador', {
        templateUrl: "investigador/investigadorEdit.html",
        controller: "EditInvestigadorController",
        resolve: {
                investigador:['investigadorRR','$route',function(investigadorRR,$route) {
                return investigadorRR.get($route.current.params.idInvestigador);
            }]
        }
    });

    $routeProvider.when('/investigadorNew', {
        templateUrl: "investigador/investigadorEdit.html",
        controller: "NewInvestigadorController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);
