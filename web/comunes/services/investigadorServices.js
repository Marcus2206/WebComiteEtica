
function InvestigadorRR($http, $q, baseUrl, $log) {

    this.get = function (idInvestigador) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/InvestigadorRead/' + idInvestigador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.insert = function (investigador) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(baseUrl + '/api/InvestigadorInsert', investigador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.update = function (investigador) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(baseUrl + '/api/InvestigadorUpdate', investigador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.listInvestigadorSinIdInvestigacionFind = function (idInvestigacion) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/InvestigadorSinIdInvestigacionFind/' + idInvestigacion)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.delete = function (investigador) {
        var defered = $q.defer();
        var params = {idInvestigador: investigador.idInvestigador};
        var config = {params};
        $http.put(baseUrl + '/api/InvestigadorDelete', null, config)
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
        var promise = defered.promise;
        $http.get(baseUrl + '/api/InvestigadorFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };
}