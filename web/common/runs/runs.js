var app = angular.module("app");

app.run(["$rootScope", function ($rootScope) {

        
    }]);

/*Salir de modal con botón atrás en Android*/
//app.run([
//    '$rootScope', '$modalStack',
//    function ($rootScope, $modalStack) {
//        $rootScope.$on('$locationChangeStart', function (event) {
//            var top = $modalStack.getTop();
//            if (top) {
//                $modalStack.dismiss(top.key);
//                event.preventDefault();
//            }
//        });
//    }
//]);