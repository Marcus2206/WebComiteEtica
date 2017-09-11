
function ParametroDetalleRR($http, $q, baseUrl, $log) {


    this.insert = function (parametroDetalle) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/ParametroDetalleInsert', parametroDetalle)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (parametroDetalle) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/ParametroDetalleUpdate/', parametroDetalle)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (parametroDetalle) {
        var defered = $q.defer();
        var params = {idParametro: parametroDetalle.id.idParametro,
            idParametroDetalle: parametroDetalle.id.idParametroDetalle};
        var config = {params};
        $http.put(baseUrl + '/api/ParametroDetalleDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

}