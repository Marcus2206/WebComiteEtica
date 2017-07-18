var app = angular.module("app");

app.service('fileUpload', ['$http', '$log', function ($http, $log) {

        this.uploadFileToUrl = function (file) {
            var uploadUrl = "http://localhost:8080/RestComiteEtica/api/SubirArchivo";
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                    .then(function (data) {
                        alert("Exito");
                    })

                    .catch(function (data) {
                        alert("error");
                    });
        };
    }]);