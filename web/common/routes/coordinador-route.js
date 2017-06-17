var app=angular.module("app");

app.config(['$routeProvider',"$locationProvider",function($routeProvider,$locationProvider) {
    
    /*Ruta referente a Investigación*/
    $locationProvider.hashPrefix("");

    $routeProvider.when('/coordinadorList', {
       templateUrl: "coordinador/coordinadorList.html",
       controller: "ListCoordinadorController"/*,
       resolve: {
         productos:['remoteResource',function(remoteResource) {

           var data=   {
                           inicia:0,
                           max: 20
                       };
           return remoteResource.list(data);
         }]
       }*/
     });

//    $routeProvider.when('/producto/edit/:idProducto', {
//       templateUrl: "detalle.html",
//       controller: "EditCoordinadorController",
//       resolve: {
//         producto:['remoteResource','$route',function(remoteResource,$route) {
//           return remoteResource.get($route.current.params.idProducto);
//         }]
//       }
//     });
//
    $routeProvider.when('/coordinadorNew', {
               templateUrl: "coordinador/coordinadorEdit.html",
               controller: "NewCoordinadorController"
    });

     $routeProvider.otherwise({
           redirectTo: '/'
     });
}]);

