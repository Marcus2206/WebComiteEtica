
function CoordinadorRemoteResource($http, $q, baseUrl, $log) {

    this.insert = function (coordinador) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/CoordinadorInsert', coordinador)
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
        $http.get(baseUrl + '/api/CoordinadorFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idCoordinador) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/CoordinadorRead/' + idCoordinador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (coordinador) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/CoordinadorUpdate', coordinador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (coordinador) {
        var defered = $q.defer();
        var params = {idCoordinador: coordinador.idCoordinador};
        var config = {params};
        $http.put(baseUrl + '/api/CoordinadorDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };

    this.listCoordinadorSinIdInvestigacionFind = function (idInvestigacion) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/CoordinadorSinIdInvestigacionFind/' + idInvestigacion)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    if (response.status === 400) {
                        defered.reject(response.data);
                    } else {
                        throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                    }
                });

        return promise;
    };
}