
function RegistroRR($http, $q, baseUrl, $log) {

    this.insert = function (registro) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/Registro/RegistroInsert', registro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.listFindAll = function () {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Registro/RegistroListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idRegistro) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Registro/RegistroRead/' + idRegistro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.update = function (registro) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/Registro/RegistroUpdate', registro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (registro) {
        var defered = $q.defer();
        var params = {idRegistro: registro.idRegistro};
        var config = {params};
        $http.put(baseUrl + '/api/Registro/RegistroDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };


    this.validateRegistro = function (idInvestigacion, idInvestigador, idSede) {
        var defered = $q.defer();
        var params = {idInvestigacion: idInvestigacion,
            idInvestigador: idInvestigador,
            idSede: idSede
        };
        var config = {params};
        $http.put(baseUrl + '/api/Registro/RegistroValidate', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };


    this.validateRegistroEnCorrespondencia = function (idRegistro) {
        var defered = $q.defer();
        var params = {idRegistro: idRegistro
        };
        var config = {params};
        $http.put(baseUrl + '/api/Registro/RegistroEnCorrespondenciaValidate', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };
}