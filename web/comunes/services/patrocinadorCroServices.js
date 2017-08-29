
function PatrocinadorCroRR($http, $q, baseUrl, $log) {

    this.insert = function (patrCro) {
        var defered = $q.defer();
        $http.post(baseUrl + '/api/PatrocinadorCro/PatrocinadorCroInsert', patrCro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.delete = function (patrCro) {
        var defered = $q.defer();
        $http.put(baseUrl + '/api/PatrocinadorCro/PatrocinadorCroDelete', patrCro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };

    this.listPatrocinadorByIdCro = function (idCro) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/PatrocinadorCro/PatrocinadorByIdCroFind/' + idCro)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };
    
     this.listCroByIdPatrocinador = function (idPatrocinador) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/PatrocinadorCro/CroByIdPatrocinadorFind/' + idPatrocinador)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };
}