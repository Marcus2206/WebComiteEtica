
function CroRR($http,$q, baseUrl,$log) {

    this.insert = function(cro) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.post(baseUrl + '/api/CroInsert',cro)
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
  
        $http.get(baseUrl + '/api/CroFindAll')
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
  
    this.get = function(idCro) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/CroRead/'+idCro)
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
  
    this.update = function(cro) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/CroUpdate',cro)
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
    
    this.delete = function(cro) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/CroDelete',cro)
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
    
//    this.listCoordinadorSinIdInvestigacionFind = function(idInvestigacion) {
//        var defered=$q.defer();
//        var promise=defered.promise;
//  
//        $http.get(baseUrl + '/api/CoordinadorSinIdInvestigacionFind/'+idInvestigacion)
//        .then(function onSuccess(response){
//            defered.resolve(response.data);
//        })
//        .catch(function onCatch(response){
//            defered.reject(response.data);
//            if (response.status === 400) {
//                    defered.reject(response.data);
//            } else {
//                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
//            }
//        });
//
//        return promise;
//    };
}