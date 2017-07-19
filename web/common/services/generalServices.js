var app = angular.module("app");
app.service('fileUpload', ['$http', '$log', function ($http, $log) {

        this.uploadFileToUrl = function (file) {
            var uploadUrl = "http://localhost:8080/RestComiteEtica/api/SubirArchivo";
            var fd = new FormData();
            fd.append('file', file._file);
            $http.post(uploadUrl,
                    fd,
                    {
                        uploadEventHandlers: {
                            progress: function (object) {
                                $log.log("progress");
                                $log.log(object);
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
                    .then(function (data) {

                    })

                    .catch(function (data) {
                        file.progressBar = 0;
                        file._progressType = 'danger';
                    });
        };
    }]);