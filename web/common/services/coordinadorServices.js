
function CoordinadorRemoteResource($http,$q, baseUrl,$log) {
    
  this.insert = function(coordinador) {
    var defered=$q.defer();
    var promise=defered.promise;
    $log.log("entró CoordinadorRemoteResource");
    $http.post(baseUrl + '/api/CoordinadorInsert',coordinador)
    .then(function onSuccess(response){
        defered.resolve(response.data);
    })
    .catch(function onCatch(response){
        if (response.status === 400) {
                defered.reject(response.data);
        } else {
            throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
        }
    });
    
    return promise;
    
  };
  
}