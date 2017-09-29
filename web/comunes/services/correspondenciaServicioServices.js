
function CorrespondenciaServicioRR($http, $q, baseUrl, $log) {

    this.insert = function (correspondencia) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioInsert', correspondencia)
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
        $http.get(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.listServicioByCorrespondenciaFindAll = function (idCorrespondencia) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioByCorrespondenciaFindAll/' + idCorrespondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.listServicioSinPagoFindAll = function () {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioSinPagoListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idCorrespondencia) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioRead/' + idCorrespondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (correspondencia) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioUpdate', correspondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (correspondencia) {
        var defered = $q.defer();
        var params = {idCorrespondencia: correspondencia.idCorrespondencia,
            idCorrespondenciaServicio: correspondencia.idCorrespondenciaServicio
        };
        var config = {params};
        $http.put(baseUrl + '/api/CorrespondenciaServicio/CorrespondenciaServicioDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };
}