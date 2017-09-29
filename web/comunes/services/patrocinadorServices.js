
function PatrocinadorRR($http, $q, baseUrl, $log) {

    this.insert = function (patrocinador) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/Patrocinador/PatrocinadorInsert', patrocinador)
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
        $http.get(baseUrl + '/api/Patrocinador/PatrocinadorFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idPatrocinador) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Patrocinador/PatrocinadorRead/' + idPatrocinador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (patrocinador) {
        var defered = $q.defer();
        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        var config = {headers};

        $http.put(baseUrl + '/api/Patrocinador/PatrocinadorUpdate', patrocinador, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (patrocinador) {
        var defered = $q.defer();
        var params = {idPatrocinador: patrocinador.idPatrocinador};
        var config = {params};
        $http.put(baseUrl + '/api/Patrocinador/PatrocinadorDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };

    this.listPatrocinadorSinIdCroFind = function (idCro) {
        var defered = $q.defer();

        $http.get(baseUrl + '/api/Patrocinador/PatrocinadorSinIdCroFind/' + idCro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
}