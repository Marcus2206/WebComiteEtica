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
}