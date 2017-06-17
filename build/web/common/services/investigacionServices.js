/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function InvestigacionRemoteResource($http,$q, baseUrl,$log) {
    
  this.get = function(investigacionCoordinadorId) {
    var defered=$q.defer();
    var promise=defered.promise;
    $log.log("entró InvestigacionRemoteResource");
    $http.patch(baseUrl + '/api/InvestigacionCoordinadorRead',investigacionCoordinadorId)
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

