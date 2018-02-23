
function RegistroBitacoraRR($http, $q, baseUrl, $log) {

    this.insert = function (registroBitacora) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/RegistroBitacora/RegistroBitacoraInsert', registroBitacora)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.findAllByIdRegistro = function (idRegistro) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/RegistroBitacora/RegistroBitacoraFindAllByIdRegistro/' + idRegistro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
    
    this.delete = function (registroBitacora) {
        var defered = $q.defer();
        var params = {
            idRegistro: registroBitacora.idRegistro,
            idBitacora: registroBitacora.idBitacora
        };
        var config = {params};
        $http.put(baseUrl + '/api/RegistroBitacora/RegistroBitacoraDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };
}
