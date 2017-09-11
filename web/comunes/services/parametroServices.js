
function ParametroRR($http, $q, baseUrl, $log) {

    this.get = function (idParametro) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/ParametroRead/' + idParametro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.delete = function (parametro) {
        var defered = $q.defer();
        var params = {idParametro: parametro.idParametro};
        var config = {params};
        $http.put(baseUrl + '/api/ParametroDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.insert = function (parametro) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/ParametroInsert', parametro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (parametro) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/ParametroUpdate/', parametro)
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
        $http.get(baseUrl + '/api/ParametroFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.listSql = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/ParametroFindAllList')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };
}