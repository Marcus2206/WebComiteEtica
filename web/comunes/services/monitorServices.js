
function MonitorRR($http, $q, baseUrl, $log) {

    this.insert = function (monitor) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/MonitorInsert', monitor)
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
        $http.get(baseUrl + '/api/MonitorFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idMonitor) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/MonitorRead/' + idMonitor)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (monitor) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/MonitorUpdate', monitor)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.delete = function (monitor) {
        var defered = $q.defer();
        var params = {idMonitor: monitor.idMonitor};
        var config = {params};
        $http.put(baseUrl + '/api/MonitorDelete', null, config)
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