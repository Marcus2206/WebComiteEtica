/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app=angular.module("app",["ngRoute","xeditable"]);

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
 
 $locationProvider.hashPrefix("");
  $routeProvider.when('/', {
    templateUrl: "main.html",
    controller: "MainController"
  }); 
  
  $routeProvider.when('/investigacionCoordinador/read', {
    templateUrl: "investigacion/investigacionRead.html",
    controller: "ReadInvestigacionCoordinadorController",
    resolve: {
      investigacionCoordinador:['investigacionRemoteResource',function(investigacionRemoteResource) {
 
        var data=   {
                        idInvestigacion:"INV1700001",
                        idCoordinador: "COD1700001"
                    };
        return investigacionRemoteResource.get(data);
      }]
    }
  });
     
  $routeProvider.otherwise({
        redirectTo: '/'
  });   
 
}]);


app.constant("baseUrl", "../RestComiteEtica");

app.config(['baseUrl', 'investigacionRemoteResourceProvider',
  function(baseUrl, investigacionRemoteResourceProvider) {
    investigacionRemoteResourceProvider.setBaseUrl(baseUrl);
  }
]);

app.run(["$rootScope", "editableOptions",function($rootScope, editableOptions) {
    editableOptions.theme = 'bs3';
}]);