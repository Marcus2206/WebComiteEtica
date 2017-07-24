var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.controller("subirController", function ($scope, $http, $log, fileUpload) {
    $scope.myFile = [];
    $scope.progressBar = 0;

//    var element = document.getElementById('file1');
//    element.addEventListener('change', function (e) {
//        var files = e.target.files;
//        uiUploader.addFiles(files);
//        $scope.myFile = uiUploader.getFiles();
//        $scope.$apply();
//    });
//
//    $scope.btn_remove = function (file) {
//        $log.info('deleting=' + file);
//        uiUploader.removeFile(file);
//    };
//
//    $scope.btn_clean = function () {
//        uiUploader.removeAll();
//    };
//
//    $scope.downloadFile = function (name) {
//        $http({
//            method: 'GET',
//            url: 'http://localhost:8080/RestComiteEtica/api/BajarArchivo/' + name,
//            params: {name: name},
//            responseType: 'arraybuffer'
//        }).then(function (response) {
//            var filename = name;
//            var contentType = "application/undefined";
//
//            var linkElement = document.createElement('a');
//            try {
//                var blob = new Blob([response.data], {type: contentType});
//                var url = window.URL.createObjectURL(blob);
//
//                linkElement.setAttribute('href', url);
//                linkElement.setAttribute("download", filename);
//
//                var clickEvent = new MouseEvent("click", {
//                    "view": window,
//                    "bubbles": true,
//                    "cancelable": false
//                });
//                linkElement.dispatchEvent(clickEvent);
//            } catch (ex) {
//            }
//        }).catch(function (data) {
//        });
//    };
//
//    $scope.uploadFile = function () {
//        var file = $scope.myFile;
//        angular.forEach(file, function (item) {
//
//            fileUpload.uploadFileToUrl(item, $scope);
//        });
//    };
//
//    $scope.eliminarFile = function (item) {
//        var i = $scope.myFile.indexOf(item);
//        $log.log("index=" + i);
//        
//        if (i !== -1) {
//            $scope.myFile.splice(i, 1);
//        }
//    };
//    
//    $scope.eliminarTodo = function(){
//        $scope.myFile.splice(0,$scope.myFile.length);
//    };

});


