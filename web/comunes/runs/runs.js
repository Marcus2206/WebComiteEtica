var app = angular.module("app");

app.run(["$rootScope", 'auth', function ($rootScope, auth) {

        $rootScope.$on('$routeChangeStart', function ()
        {
            //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
            //la cuál hemos inyectado en la acción run de la aplicación
            auth.checkStatus();
        });

        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

    }]);

function isEmptyJSON(s) {
    for (var i in s) {
        return false;
    }
    return true;
}

//al cambiar de rutas
   