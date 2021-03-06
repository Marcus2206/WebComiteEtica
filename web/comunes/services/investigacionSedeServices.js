
function InvestigacionSedeRR($http,$q, baseUrl,$log) {

    this.insert = function(invSede) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.post(baseUrl + '/api/InvestigacionSedeInsert',invSede)
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
  
//    this.list = function() {
//        var defered=$q.defer();
//        var promise=defered.promise;
//  
//        $http.get(baseUrl + '/api/InvestigacionCoordinadorFindAll')
//        .then(function onSuccess(response){
//            defered.resolve(response.data);
//        })
//        .catch(function onCatch(response){
//            defered.reject(response.data);
//            /*if (response.status === 400) {
//                    defered.reject(response.data);
//            } else {
//                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
//            }*/
//        });
//
//        return promise;
//    };
  
//    this.get = function(id) {
//        var defered=$q.defer();
//        var promise=defered.promise;
//        $http.get(baseUrl + '/api/InvestigacionCoordinadorRead/'+id.idInvestigacion+"/"+id.idCoordinador)
//        .then(function onSuccess(response){
//            defered.resolve(response.data);
//        })
//        .catch(function onCatch(response){
//            defered.reject(response.data);
//            /*if (response.status === 400) {
//                    defered.reject(response.data);
//            } else {
//                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
//            }*/
//        });
//
//        return promise;
//    };
  
//    this.update = function(invCoordinador) {
//        var defered=$q.defer();
//        var promise=defered.promise;
//        $http.put(baseUrl + '/api/InvestigacionCoordinadorUpdate',invCoordinador)
//        .then(function onSuccess(response){
//            defered.resolve(response.data);
//        })
//        .catch(function onCatch(response){
//            defered.reject(response.data);
//            /*if (response.status === 400) {
//                    defered.reject(response.data);
//            } else {
//                throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
//            }*/
//        });
//
//        return promise;
//    };
    
    this.delete = function(invSede) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.put(baseUrl + '/api/InvestigacionSedeDelete',invSede)
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
    
    this.listSedeByIdInvestigacion = function(idInvestigacion) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http.get(baseUrl + '/api/InvestigacionSedeByIdInvestigacionFind/'+idInvestigacion)
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