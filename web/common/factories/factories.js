var app = angular.module("app");

app.factory("auth", function ($cookies, $cookieStore, $location, $log)
{
    return{
        login: function (username, password)
        {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.username = username;
            $cookies.password = password;
            //mandamos a la home
            $location.path("/");
        },
        logout: function ()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookies.remove("username");
            $cookies.remove("password");
            //mandamos al login
            $location.path("/login");
        },
        checkStatus: function ()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/investigacionList","/correspondenciaList"];
            var rutaLogin=[ "/login"];
            if (this.in_array($location.path(), rutasPrivadas) && typeof ($cookies.username) === "undefined")
            {
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            
            if (this.in_array($location.path(),rutaLogin) && typeof ($cookies.username) !== "undefined")
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