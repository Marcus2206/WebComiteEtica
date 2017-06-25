
function InvestigacionRemoteResource($http,$q, baseUrl,$log) {
    
  this.get = function(idInvestigacion) {
    var defered=$q.defer();
    var promise=defered.promise;
    $http.get(baseUrl + '/api/InvestigacionRead/'+idInvestigacion)
    .then(function onSuccess(response){
        defered.resolve(response.data);
    })
    .catch(function onCatch(response){
        defered.reject(response.data);
//        if (response.status === 400) {
//                defered.reject(response.data);
//        } else {
//            throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
//        }
    });
    
    return promise;
    
  };
  
  this.insert = function(investigacion) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.post(baseUrl + '/api/InvestigacionInsert',investigacion)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
            /*if (response.status === 400) {
                    defered.reject(response.data);
            } else {
                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
            }*/
        });

        return promise;
    };
  
    this.list = function() {
        var defered=$q.defer();
        var promise=defered.promise;
  
        $http.get(baseUrl + '/api/InvestigacionFindAll')
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
            /*if (response.status === 400) {
                    defered.reject(response.data);
            } else {
                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
            }*/
        });

        return promise;
    };
  
    this.update = function(investigacion) {
        var defered=$q.defer();
        var promise=defered.promise;
  
        $http.put(baseUrl + '/api/InvestigacionUpdate',investigacion)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
            /*if (response.status === 400) {
                    defered.reject(response.data);
            } else {
                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
            }*/
        });

        return promise;
    };
    
    this.delete = function(investigacion) {
        var defered=$q.defer();
        var promise=defered.promise;
  
        $http.put(baseUrl + '/api/InvestigacionDelete',investigacion)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
            /*if (response.status === 400) {
                    defered.reject(response.data);
            } else {
                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
            }*/
        });

        return promise;
    };
    
    
}

