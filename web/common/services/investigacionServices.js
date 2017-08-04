
function InvestigacionRemoteResource($http,$q, baseUrl,$log) {
    
  this.get = function(idInvestigacion) {
    var defered=$q.defer();
    var promise=defered.promise;
    $http.get(baseUrl + '/api/Investigacion/InvestigacionRead/'+idInvestigacion)
    .then(function onSuccess(response){
        defered.resolve(response.data);
    })
    .catch(function onCatch(response){
        defered.reject(response.data);
    });
    return promise;
  };
  
  this.insert = function(investigacion) {
        var defered=$q.defer();
        $http.post(baseUrl + '/api/Investigacion/InvestigacionInsert',investigacion)
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
        $http.get(baseUrl + '/api/Investigacion/InvestigacionFindAll')
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });
        return defered.promise;
    };
  
    this.update = function(investigacion) {
        var defered=$q.defer();
        $http.put(baseUrl + '/api/Investigacion/InvestigacionUpdate',investigacion)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });
        return defered.promise;
    };
    
    this.delete = function(investigacion) {
        var defered=$q.defer();
        $http.put(baseUrl + '/api/Investigacion/InvestigacionDelete',investigacion)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
        });
        return defered.promise;
    };
}

