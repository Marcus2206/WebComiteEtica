
function PagoRR($http, $q, baseUrl, $log) {

    this.insert = function (pago) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/Pago/PagoInsert', pago)
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
        $http.get(baseUrl + '/api/Pago/PagoListFindAll')
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
        $http.get(baseUrl + '/api/Pago/PagoRead/' + idRegistro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.update = function (pago) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/Pago/PagoUpdate', pago)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (pago) {
        var defered = $q.defer();
        var params = {idPago: pago.idPago};
        var config = {params};
        $http.put(baseUrl + '/api/Pago/PagoDelete', null, config)
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
        $http.put(baseUrl + '/api/Pago/PagoValidate', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };
}