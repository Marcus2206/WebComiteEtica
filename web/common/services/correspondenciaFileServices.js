
function CorrespondenciaFileRR($http, $q, baseUrl, $log) {

    this.insert = function (correspondenciaFile) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileInsert', correspondenciaFile)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    /*if (response.status === 400) {
                     defered.reject(response.data);
                     } else {
                     throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                     }*/
                });

        return defered.promise;
    };

    this.list = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    /*if (response.status === 400) {
                     defered.reject(response.data);
                     } else {
                     throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                     }*/
                });

        return promise;
    };

    this.listFindAll = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    /*if (response.status === 400) {
                     defered.reject(response.data);
                     } else {
                     throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                     }*/
                });

        return promise;
    };

    this.findAllByIdCorrepondencia = function (idCorrespondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileFindAllByIdCorrepondencia/' + idCorrespondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    /*if (response.status === 400) {
                     defered.reject(response.data);
                     } else {
                     throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                     }*/
                });

        return promise;
    };


    this.get = function (idCorrespondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileRead/' + idCorrespondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    /*if (response.status === 400) {
                     defered.reject(response.data);
                     } else {
                     throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                     }*/
                });

        return promise;
    };

    this.update = function (correspondenciaFile) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileUpdate', correspondenciaFile)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                    /*if (response.status === 400) {
                     defered.reject(response.data);
                     } else {
                     throw new Error("Fallo obtener los datos:" + response.status + "\n" + response.data);
                     }*/
                });

        return promise;
    };

    this.delete = function (correspondenciaFile) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileDelete', correspondenciaFile)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                    if (response.status === 400) {
                        defered.reject(response.data);
//            } else if(response.status === 1554822){
//                     defered.reject(response.data);
                    }

                });

        return promise;
    };

    this.deleteCarpeta = function (carpeta) {
        var defered = $q.defer();

//        $http.put(baseUrl + '/api/CorrespondenciaFile/CorrespondenciaFileDeleteAll')
        $http({
            method: 'PUT',
            url: baseUrl + "/api/CorrespondenciaFile/CorrespondenciaFileDeleteAll",
            params: {carpeta: carpeta}
        })
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                    if (response.status === 400) {
                        defered.reject(response.data);
//            } else if(response.status === 1554822){
//                     defered.reject(response.data);
                    }

                });

        return defered.promise;
    };

}