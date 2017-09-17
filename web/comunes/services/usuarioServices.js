
function UsuarioRR($http, $q, baseUrl, $log, UrlOrigen) {

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
            usuarioIngresa: usuario.usuarioIngresa,
            estado: usuario.estado
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

    this.updatePassword = function (usuario) {
        var defered = $q.defer();
        var params = {
            idUsuario: usuario.idUsuario,
            password: usuario.password,
            usuarioModifica: usuario.usuarioModifica
        };
        var config = {params};
        $http.put(baseUrl + '/api/Usuario/PasswordUpdate', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (usuario) {
        var defered = $q.defer();

        $http.put(baseUrl + '/api/Usuario/UsuarioUpdate', usuario)
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

    this.getUser = function (usuario, password) {
        var defered = $q.defer();
        var params = {
            usuario: usuario,
            password: password
        };
        var config = {params};
        $http.get(baseUrl + '/api/Usuario/UsuarioReadValidate', config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.getRestSession = function (usuario, password) {
        var defered = $q.defer();
        var params = {
            usuario: usuario,
            password: password
        };
        var config = {params};
        $http.get(baseUrl + '/j_security_check?j_username=' + usuario + '&j_password=' + password)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.getWebSession = function (usuario, password) {
        var defered = $q.defer();
        var params = {
            usuario: usuario,
            password: password
        };
        var config = {params};
        $http.get(UrlOrigen + '/j_security_check?j_username=' + usuario + '&j_password=' + password)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.getLogOutRestSession = function (usuario, password) {
        var defered = $q.defer();
        var params = {
            usuario: usuario,
            password: password
        };
        var config = {params};
        $http.get(baseUrl + '/logout.jsp')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.getLogOutWebSession = function (usuario, password) {
        var defered = $q.defer();
        var params = {
            usuario: usuario,
            password: password
        };
        var config = {params};
        $http.get(UrlOrigen + '/logout.jsp')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
}