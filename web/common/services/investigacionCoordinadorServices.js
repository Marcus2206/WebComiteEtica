
function InvestigacionCoordinadorRemoteResource($http,$q, baseUrl,$log) {

    this.insert = function(invCoordinador) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.post(baseUrl + '/api/InvestigacionCoordinadorInsert',invCoordinador)
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
  
        $http.get(baseUrl + '/api/InvestigacionCoordinadorFindAll')
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
  
    this.get = function(id) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/InvestigacionCoordinadorRead/'+id.idInvestigacion+"/"+id.idCoordinador)
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
  
    this.update = function(invCoordinador) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/InvestigacionCoordinadorUpdate',invCoordinador)
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
    
    this.delete = function(invCoordinador) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/InvestigacionCoordinadorDelete',invCoordinador)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response);
            /*if (response.status === 400) {
                     defered.reject(response.data);
            } else {
                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
            }*/
            
        });

        return promise;
    };
    
    this.listCoordinadorByIdInvestigacion = function(idInvestigacion) {
        var defered=$q.defer();
        var promise=defered.promise;
  
        $http.get(baseUrl + '/api/InvestigacionCoordinadorByIdInvestigacionFind/'+idInvestigacion)
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