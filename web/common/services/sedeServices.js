
function SedeRR($http,$q, baseUrl,$log) {
    
    this.get = function(idSede) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/SedeRead/'+idSede)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
    
    this.insert = function(sede) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.post(baseUrl + '/api/SedeInsert',sede)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };

    this.update = function(sede) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/SedeUpdate', sede)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
    
    this.list = function() {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/SedeFindAll')
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