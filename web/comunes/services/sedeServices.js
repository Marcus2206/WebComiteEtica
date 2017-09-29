
function SedeRR($http, $q, baseUrl, $log) {

    this.get = function (idSede) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/SedeRead/' + idSede)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.insert = function (sede) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/SedeInsert', sede)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.update = function (sede) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/SedeUpdate', sede)
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
        $http.get(baseUrl + '/api/SedeFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.delete = function (sede) {
        var defered = $q.defer();
        var params = {idSede: sede.idSede};
        var config = {params};
        $http.put(baseUrl + '/api/SedeDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.listSedeSinIdInvestigacionFind = function (idInvestigacion) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/SedeSinIdInvestigacionFind/' + idInvestigacion)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };
}