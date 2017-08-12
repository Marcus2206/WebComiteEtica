
function CorreoRR($http, $q, baseUrl, $log) {

    this.get = function (idCorreo) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Correo/CorreoRead/' + idCorreo)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.insert = function (correo) {
        var defered = $q.defer();
        var promise = defered.promise;
        var params = {
            usuario: correo.usuario,
            password: correo.password,
            perfil: correo.perfil,
            usuarioIngresa: correo.usuarioIngresa
        };
        var config = {params};
        $http.post(baseUrl + '/api/Correo/CorreoInsert', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.update = function (correo) {
        var defered = $q.defer();

        $http.put(baseUrl + '/api/Correo/CorreoUpdate', correo)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.list = function () {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Correo/CorreoListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (correo) {
        var defered = $q.defer();
        var params = {idUsuario: correo.idUsuario};
        var config = {params};

        $http.put(baseUrl + '/api/Correo/CorreoDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
}