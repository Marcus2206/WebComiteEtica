
function CroRR($http, $q, baseUrl, $log) {

    this.insert = function (cro) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/Cro/CroInsert', cro)
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
        $http.get(baseUrl + '/api/Cro/CroFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idCro) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Cro/CroRead/' + idCro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.update = function (cro) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/Cro/CroUpdate', cro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.delete = function (cro) {
        var defered = $q.defer();
        var params = {idCro: cro.idCro};
        var config = {params};
        $http.put(baseUrl + '/api/Cro/CroDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };

    this.listCroByPatrocinador = function (idPatrocinador) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Cro/CroByPatrocinadorList/' + idPatrocinador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.listCroSinIdPatrocinadorFind = function (idPatrocinador) {
        var defered = $q.defer();

        $http.get(baseUrl + '/api/Cro/CroSinIdPatrocinadorFind/' + idPatrocinador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
}