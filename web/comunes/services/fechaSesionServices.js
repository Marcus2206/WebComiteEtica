function FechaSesionRR($http, $q, baseUrl, $log) {

    this.listProx = function () {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/FechaSesion/FechaSesionProxFind')
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
        $http.get(baseUrl + '/api/FechaSesion/FechaSesionFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.listAll = function () {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/FechaSesion/FechaSesionFindAllList')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.insert = function (fechaSesion) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/FechaSesion/FechaSesionInsert', fechaSesion)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

    this.get = function (idFechaSesion) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/FechaSesion/FechaSesionRead/' + idFechaSesion)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };


    this.update = function (fechaSesion) {
        var defered = $q.defer();

        $http.put(baseUrl + '/api/FechaSesion/FechaSesionUpdate', fechaSesion)
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

    this.delete = function (fechaSesion) {
        var defered = $q.defer();
        var params = {idFechaSesion: fechaSesion.idFechaSesion};
        var config = {params};

        $http.put(baseUrl + '/api/FechaSesion/FechaSesionDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };


}