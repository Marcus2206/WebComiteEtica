function FileRR($http, $q, baseUrl, $log) {

    this.uploadFileToUrl = function (file, idCorrespondencia) {
        var defered = $q.defer();
        var uploadUrl = baseUrl + "/api/File/SubirArchivo/" + idCorrespondencia;
        var fd = new FormData();
        fd.append('file', file._file);
        $http.post(uploadUrl,
                fd,
                {
                    uploadEventHandlers: {
                        progress: function (object) {
                            file._progress = parseInt(100.0 * object.loaded / object.total);
                            if (file._progress < 99) {
                                file._progressType = 'info';
                            } else {
                                file._progressType = 'success';
                            }
                        }
                    },
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .then(function onSuccess(response) {
                    defered.resolve(response);
                })
                .catch(function onCatch(response) {
                    file.progressBar = 0;
                    file._progress = 0;
                    file._progressType = 'danger';
                    defered.reject(response);
                });
        return defered.promise;
    };

    this.downloadFileFromURL = function (file) {
        var defered = $q.defer();
        $http({
            method: 'GET',
            url: baseUrl + "/api/File/BajarArchivo",
            params: {direccion: file._correspondenciaFile.direccion},
            responseType: 'arraybuffer'
        })
                .then(function onSuccess(response) {
                    var filename = file._correspondenciaFile.nombreArchivo;
                    var contentType = "application/undefined";

                    var linkElement = document.createElement('a');
                    try {
                        var blob = new Blob([response.data], {type: contentType});
                        var url = window.URL.createObjectURL(blob);

                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", filename);

                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    } catch (ex) {
                    }
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };

    this.deleteFileFromURL = function (file) {
        var defered = $q.defer();
        $http({
            method: 'DELETE',
            url: baseUrl + "/api/File/BorrarArchivo",
            params: {direccion: file._correspondenciaFile.direccion},
            responseType: 'arraybuffer'
        })
                .then(function onSuccess(response) {

                    $log.log("deleteFileFromURL");
                    $log.log(response);
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };


    this.deleteAllFileFromURL = function (carpeta) {
        var defered = $q.defer();
        $http({
            method: 'DELETE',
            url: baseUrl + "/api/File/BorrarTodoArchivo",
            params: {carpeta: carpeta},
            responseType: 'arraybuffer'
        })
                .then(function onSuccess(response) {
                    defered.resolve(response.data);
                })
                .catch(function onCatch(response) {
                    defered.reject(response.data);
                });
        return defered.promise;
    };
}