
function UsuarioRR($http, $q, baseUrl, $log) {

    this.get = function (idUsuario) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Usuario/UsuarioRead/' + idUsuario)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.insert = function (usuario) {
        var defered = $q.defer();
        var promise = defered.promise;
        var params = {
            usuario: usuario.usuario,
            password: usuario.password,
            perfil: usuario.perfil,
            usuarioIngresa: usuario.usuarioIngresa
        };
        var config = {params};
        $http.post(baseUrl + '/api/Usuario/UsuarioInsert', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };
//
//    this.update = function(sede) {
//        var defered=$q.defer();
//        var promise=defered.promise;
//        $http.put(baseUrl + '/api/SedeUpdate', sede)
//        .then(function onSuccess(response){
//            defered.resolve(response.data);
//        })
//        .catch(function onCatch(response){
//            defered.reject(response.data);
//        });
//
//        return promise;
//    };

    this.list = function () {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Usuario/UsuarioListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (usuario) {
        var defered = $q.defer();
        var params = {idUsuario: usuario.idUsuario};
        var config = {params};

        $http.put(baseUrl + '/api/Usuario/UsuarioDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.getUser = function (idUsuario) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Usuario/UsuarioRead/' + idUsuario)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
}