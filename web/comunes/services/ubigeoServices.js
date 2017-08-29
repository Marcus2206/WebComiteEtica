
function UbigeoRR($http,$q, baseUrl,$log) {
    
    this.getDepartamento = function(idDepartamento) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/DepartamentoRead/'+idDepartamento)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
    
    this.getDepartamentoList = function() {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/DepartamentoFindAll')
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };

    this.getProvinciaByDepartamento = function(idDepartamento) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/ProvinciaByDepartamentoFind/'+idDepartamento)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
    
    this.getDistritoByDepartamentoProvincia = function(idDepartamento,idProvincia) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/DistritoByDepartamentoProvinciaFind/'+idDepartamento+'/'+idProvincia)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
    
    this.delete = function(sede) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/SedeDelete',sede)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
}