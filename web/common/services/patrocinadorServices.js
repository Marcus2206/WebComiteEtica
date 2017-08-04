
function PatrocinadorRR($http,$q, baseUrl,$log) {

    this.insert = function(patrocinador) {
        var defered=$q.defer();
        $http.post(baseUrl + '/api/Patrocinador/PatrocinadorInsert',patrocinador)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return defered.promise;
    };
  
    this.list = function() {
        var defered=$q.defer();
        $http.get(baseUrl + '/api/Patrocinador/PatrocinadorFindAll')
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return defered.promise;
    };
  
    this.get = function(idPatrocinador) {
        var defered=$q.defer();
        $http.get(baseUrl + '/api/Patrocinador/PatrocinadorRead/'+idPatrocinador)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return defered.promise;
    };
  
    this.update = function(patrocinador) {
        var defered=$q.defer();
        $http.put(baseUrl + '/api/Patrocinador/PatrocinadorUpdate',patrocinador)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });

        return defered.promise;
    };
    
    this.delete = function(patrocinador) {
        var defered=$q.defer();
        $http.put(baseUrl + '/api/Patrocinador/PatrocinadorDelete',patrocinador)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response);            
        });

        return defered.promise;
    };
}