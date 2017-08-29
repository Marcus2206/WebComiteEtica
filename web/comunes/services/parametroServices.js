
function ParametroRR($http,$q, baseUrl,$log) {
    
    this.get = function(idParametro) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/ParametroRead/'+idParametro)
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
        $http.get(baseUrl + '/api/ParametroFindAll')
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return promise;
    };
}