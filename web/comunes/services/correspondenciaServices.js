
function CorrespondenciaRR($http, $q, baseUrl, $log) {

    this.insert = function (correspondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(baseUrl + '/api/Correspondencia/CorrespondenciaInsert', correspondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.list = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);

                });

        return promise;
    };

    this.listFindAll = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaListFindAll')
                .then(function onSuccess(response) {
                    $log.log("response");
                    $log.log(response.data);
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    $log.log("onCatch");
                    $log.log(response);
                    defered.reject(response.data);
                });

        return promise;
    };

    this.get = function (idCorrespondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaRead/' + idCorrespondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.update = function (correspondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaUpdate', correspondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.delete = function (correspondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaDelete', correspondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return promise;
    };
}