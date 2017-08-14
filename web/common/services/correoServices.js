
function CorreoRR($http, $q, baseUrl, $log) {

    this.get = function (idCorreo) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Correo/CorreoRead/' + idCorreo)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.insert = function (correo) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/Correo/CorreoInsert', correo)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.update = function (correo) {
        var defered = $q.defer();

        $http.put(baseUrl + '/api/Correo/CorreoUpdate', correo)
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
        $http.get(baseUrl + '/api/Correo/CorreoListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.delete = function (correo) {
        var defered = $q.defer();
        var params = {idCorreo: correo.idCorreo};
        var config = {params};

        $http.put(baseUrl + '/api/Correo/CorreoDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
}