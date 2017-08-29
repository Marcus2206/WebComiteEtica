
function CorrespondenciaRR($http,$q, baseUrl,$log) {

    this.insert = function(correspondencia) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.post(baseUrl + '/api/Correspondencia/CorrespondenciaInsert',correspondencia)
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
  
        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaFindAll')
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
    
    this.listFindAll = function() {
        var defered=$q.defer();
        var promise=defered.promise;
  
        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaListFindAll')
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
  
    this.get = function(idCorrespondencia) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaRead/'+idCorrespondencia)
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
  
    this.update = function(correspondencia) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaUpdate',correspondencia)
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
    
    this.delete = function(correspondencia) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaDelete',correspondencia)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response);
            if (response.status === 400) {
                     defered.reject(response.data);
//            } else if(response.status === 1554822){
//                     defered.reject(response.data);
            }
            
        });

        return promise;
    };
    
    this.listCoordinadorSinIdInvestigacionFind = function(idInvestigacion) {
        var defered=$q.defer();
        var promise=defered.promise;
  
        $http.get(baseUrl + '/api/CoordinadorSinIdInvestigacionFind/'+idInvestigacion)
        .then(function onSuccess(response){
            defered.resolve(response.data);
        })
        .catch(function onCatch(response){
            defered.reject(response.data);
            if (response.status === 400) {
                    defered.reject(response.data);
            } else {
                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
            }
        });

        return promise;
    };
}