var app = angular.module("app");
app.factory("auth", function ($location, $log, localStorageService, usuarioRR, UrlOrigen, baseUrl)
{
    return{
        login: function ($scope, username, password, SweetAlert)
        {
            //creamos la cookie con el nombre que nos han pasado
            usuarioRR.getUser(username, password)
                    .then(function (response) {
                        $log.log("----------------------------------------->>>>>");
                        $log.log(typeof (response));
                        $log.log(response);

                        if (response.length !== 0) {
                            if (typeof (response) !== 'string') {
                                localStorageService.set("usuario", username);
                                localStorageService.set("rolUsuario", response[0].perfil);
                                localStorageService.set("mostrar", false);

                                //mandamos a la home
                                SweetAlert.swal("Bienvenido", "", "success");
                            setTimeout("window.open('" + UrlOrigen + "', '_self', false);", 750);
                            } else {
                                SweetAlert.swal("Credenciales incorrectas", "Por favor, intente nuevamente.", "warning");
                            }
                        } else {
                            SweetAlert.swal("Credenciales incorrectas", "Por favor, intente nuevamente.", "warning");
                        }
                    }, function (response) {
                        SweetAlert.swal("Error en la validación", "Por favor, intente nuevamente.", "warning");
                    });

        },
        logout: function ()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            localStorageService.set("usuario", "");
            localStorageService.set("rolUsuario", "");
            localStorageService.set("mostrar", true);
            //mandamos al login
            setTimeout("window.open('" + UrlOrigen + "/logout.jsp', '_self', false);", 500);
            setTimeout("window.open('" + baseUrl + "/logout.jsp', '_self', false);", 0);
//            $location.path("/login");
        },
        checkStatus: function ()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = [""];
            var rutaLogin = ["/login"];
//            localStorageService.set("usuario", "fsolis");
//            localStorageService.set("rolUsuario", "PD01");
//            localStorageService.set("mostrar", false);
            if (localStorageService.get("usuario") !== "") {
                if (this.in_array($location.path(), rutasPrivadas))
                {
                    $location.path("/login");
                }
                //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home

                if (this.in_array($location.path(), rutaLogin))
                {
                    $location.path("/");
                }
            } else {
                $location.path("/login");
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
