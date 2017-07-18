var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.controller("subirController", function ($scope, $http, $log, fileUpload) {
    $scope.myFile = [];
    
    
    $scope.downloadFile = function (name) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RestComiteEtica/api/BajarArchivo/' + name,
            params: {name: name},
            responseType: 'arraybuffer'
        }).then(function (response) {
            var filename = name;
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
        }).catch(function (data) {
        });
    };

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        angular.forEach(file, function (item) {
            
            fileUpload.uploadFileToUrl(item._file);
        });
    };
});


