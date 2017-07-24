var app = angular.module("app");
app.service('fileUpload', ['$http', '$log', 'baseUrl', function ($http, $log, baseUrl) {

//        this.uploadFileToUrl = function (file, idCorrespondencia) {
//            var uploadUrl = baseUrl + "/api/File/SubirArchivo/" + idCorrespondencia;
//            var fd = new FormData();
//            fd.append('file', file._file);
//            $http.post(uploadUrl,
//                    fd,
//                    {
//                        uploadEventHandlers: {
//                            progress: function (object) {
//                                file._progress = parseInt(100.0 * object.loaded / object.total);
//                                if (file._progress < 99) {
//                                    file._progressType = 'info';
//                                } else {
//                                    file._progressType = 'success';
//                                }
//                            }
//                        },
//                        transformRequest: angular.identity,
//                        headers: {'Content-Type': undefined}
//                    })
//                    .then(function (data) {
//                        $log.log(file);
//                        $log.log("----");
//                        $log.log(data);
//                    })
//
//                    .catch(function (data) {
//                        file.progressBar = 0;
//                        file._progressType = 'danger';
//                    });
//        };
//
//        this.downloadFileFromURL = function (name) {
//            $http({
//                method: 'GET',
//                url: baseUrl + "/api/File/BajarArchivo/",
//                params: {name: name},
//                responseType: 'arraybuffer'
//            }).then(function (response) {
//                var filename = name;
//                var contentType = "application/undefined";
//
//                var linkElement = document.createElement('a');
//                try {
//                    var blob = new Blob([response.data], {type: contentType});
//                    var url = window.URL.createObjectURL(blob);
//
//                    linkElement.setAttribute('href', url);
//                    linkElement.setAttribute("download", filename);
//
//                    var clickEvent = new MouseEvent("click", {
//                        "view": window,
//                        "bubbles": true,
//                        "cancelable": false
//                    });
//                    linkElement.dispatchEvent(clickEvent);
//                } catch (ex) {
//                }
//            }).catch(function (data) {
//            });
//        };
//
//        this.deleteFileFromURL = function (url, name) {
//            $http({
//                method: 'GET',
//                url: url,
//                params: {name: name},
//                responseType: 'arraybuffer'
//            }).then(function (response) {
//                var filename = name;
//                var contentType = "application/undefined";
//
//                var linkElement = document.createElement('a');
//                try {
//                    var blob = new Blob([response.data], {type: contentType});
//                    var url = window.URL.createObjectURL(blob);
//
//                    linkElement.setAttribute('href', url);
//                    linkElement.setAttribute("download", filename);
//
//                    var clickEvent = new MouseEvent("click", {
//                        "view": window,
//                        "bubbles": true,
//                        "cancelable": false
//                    });
//                    linkElement.dispatchEvent(clickEvent);
//                } catch (ex) {
//                }
//            }).catch(function (data) {
//            });
//        };
    }]);