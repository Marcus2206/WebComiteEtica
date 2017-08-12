var app = angular.module("app");
app.factory("auth", function ($location, $log, localStorageService, usuarioRR)
{
    return{
        login: function ($scope, username, password,SweetAlert)
        {
            //creamos la cookie con el nombre que nos han pasado
            usuarioRR.getUser(username, password)
                    .then(function (response) {
                        if (response.length !== 0) {
                            localStorageService.set("usuario", username);
                            $log.log(response);
                            localStorageService.set("rolUsuario", response[0].perfil);
                            localStorageService.set("mostrar", false);

                            //mandamos a la home
                            $location.path("/");
                            SweetAlert.swal("Bienvenido","","success");
                        }else{
                            SweetAlert.swal("Credenciales incorrectas","Por favor, intente nuevamente.","warning");
                        }
                    }, function (response) {
                        SweetAlert.swal("Credenciales incorrectas","Por favor, intente nuevamente.","warning");
                    });
            
        },
        logout: function ()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            localStorageService.set("usuario", "");
            localStorageService.set("rolUsuario", "");
            localStorageService.set("mostrar", true);
            //mandamos al login
            $location.path("/login");
        },
        checkStatus: function ()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/investigacionList", "/correspondenciaList"];
            var rutaLogin = ["/login"];
            if (this.in_array($location.path(), rutasPrivadas) && localStorageService.get("usuario") === "")
            {
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home

            if (this.in_array($location.path(), rutaLogin) && localStorageService.get("usuario") !== "")
            {
                $location.path("/");
            }

        },
        in_array: function (needle, haystack)
        {
            var key = '';
            for (key in haystack)
            {
                if (haystack[key] === needle)
                {
                    return true;
                }
            }
            return false;
        }
    };
});