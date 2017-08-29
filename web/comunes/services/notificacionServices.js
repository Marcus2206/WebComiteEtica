
function NotificacionRR($http, $q, baseUrl, $log) {

    this.updateSetLeido = function (notificacion) {
        var defered = $q.defer();
        var params = {
            idNotificacion: notificacion.idNotificacion,
            usuario: notificacion.usuario
        };
        var config = {params};
        $http.put(baseUrl + '/api/Notificacion/SetLeidoUpdate', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

this.updateSetTodoLeido = function (usuario) {
        var defered = $q.defer();
        var params = {
            usuario: usuario
        };
        var config = {params};
        $http.put(baseUrl + '/api/Notificacion/SetTodoLeidoUpdate', null, config)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };
    
    this.list = function (usuario) {
        var defered = $q.defer();
        $http.get(baseUrl + '/api/Notificacion/NotificacionListFindAll/' + usuario)
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });

        return defered.promise;
    };

}