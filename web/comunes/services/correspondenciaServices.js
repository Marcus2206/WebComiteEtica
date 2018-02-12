
function CorrespondenciaRR($http, $q, baseUrl, $log) {

    this.insert = function (correspondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(baseUrl + '/api/Correspondencia/CorrespondenciaInsert', correspondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.list = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);

                });

        return promise;
    };

    this.listFindAll = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaListFindAll')
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.get = function (idCorrespondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciaRead/' + idCorrespondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.getCorrespondenciasValidas = function (idRegistro) {
        var defered = $q.defer();
        var promise = defered.promise;
        var params = {idRegistro: idRegistro};
        var config = {params};
        $http.get(baseUrl + '/api/Correspondencia/CorrespondenciasValidasRead', config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.update = function (correspondencia) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaUpdate', correspondencia)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };

    this.delete = function (correspondencia) {
        var defered = $q.defer();
        var params = {idCorrespondencia: correspondencia.idCorrespondencia};
        var config = {params};
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaDelete', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response);
                });

        return defered.promise;
    };

    this.getSesionesCorrespondencia = function (fechaSesion) {
        var defered = $q.defer();
        var promise = defered.promise;

        var fechaParam;
//        fechaParam=
        if (typeof (fechaSesion) === 'number') {
            fechaParam = "" + fechaSesion;
        } else if (typeof (fechaSesion) === 'string') {
            fechaParam = "" + Date.parse(fechaSesion);
        }
        var params = {fechaSesion: fechaParam};
        var config = {params};
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaEnSesion', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };
    
    this.getAllCorrespondenciaByFechaSesion = function (fechaSesion) {
        var defered = $q.defer();
        var promise = defered.promise;

        var fechaParam;
        //01/01/2007
        var dia, mes, anio;
        dia=fechaSesion.substring(0,2);
        mes=fechaSesion.substring(3,5);
        anio=fechaSesion.substring(6,10);
        
//        if (typeof (fechaSesion) === 'number') {
//            fechaParam = "" + fechaSesion;
//        } else if (typeof (fechaSesion) === 'string') {
            fechaParam = "" + Date.parse(mes+"/"+dia+"/"+anio);
//        }

        var params = {fechaSesion: fechaParam};
        var config = {params};
        $http.put(baseUrl + '/api/Correspondencia/CorrespondenciaAllByFechaSesion', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return promise;
    };
}