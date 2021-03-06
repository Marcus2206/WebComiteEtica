
function PagoDetalleRR($http, $q, baseUrl, $log) {

    this.insert = function (pagoDetalle) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/PagoDetalle/PagoDetalleInsert', pagoDetalle)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.listFindPagoDetalleByPago = function (idPago) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/PagoDetalle/PagoDetalleFindByPagoList/' + idPago)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (pagoDetalle) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/PagoDetalle/PagoDetalleRead/' + pagoDetalle.idPago+'/'+pagoDetalle.idPagoDetalle)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.update = function (pagoDetalle) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/PagoDetalle/PagoDetalleUpdate', pagoDetalle)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (pagoDetalle) {
        var defered = $q.defer();
        var params = {
            idPago: pagoDetalle.idPago,
            idPagoDetalle: pagoDetalle.idPagoDetalle,
            idCorrespondencia: pagoDetalle.idCorrespondencia,
            idCorrespondenciaServicio: pagoDetalle.idCorrespondenciaServicio

        };
        var config = {params};
        $http.put(baseUrl + '/api/PagoDetalle/PagoDetalleDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };

}