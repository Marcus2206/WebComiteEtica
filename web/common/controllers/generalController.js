var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

app.service('fileUpload', ['$http','$log', function ($http, $log) {
        this.uploadFileToUrl = function (file, uploadUrl) {
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

app.controller("subirController", function ($scope, $http, $log, fileUpload) {
//    $scope.archivoPS=null;
//    $scope.subirArch = function () {
//        var obj = document.getElementById("fichero").files;
//        $log.log(obj);
//        $http.post("http://localhost:8080/RestComiteEtica" + '/api/greet', obj)
//                .then(function (data) {
//                    alert("Exito");
//                    $log.log(data);
//                }).catch(function (data) {
//                    alert("error");
//                    $log.log(data);
//        });
//    };

//    $scope.envia = function (file) {
//        $scope.modeloFile;
//        //action="http://localhost:8080/RestComiteEtica/api/VerificaArchivo" 
//        //method="post" 
//        //enctype="multipart/form-data"
//        $log.log("modeloFile");
//        $log.log(file);
//        var formData = new FormData();
//        formData.append('foo', 'bar');
//
//        this.$http.post('/api', formData)
//        
//        $http.post("http://localhost:8080/RestComiteEtica/api/VerificaArchivo", fd, {
//            transformRequest: angular.identity,
//            headers: {'Content-Type': undefined}
//        })
//                .then(function (data) {
//                    alert("listo");
//                })
//                .error(function (data) {
//                    alert("error");
//                });
//
////        $http.post("http://localhost:8080/RestComiteEtica/api/VerificaArchivo", data, config)
////                .then(function (data) {
////                    alert("listo");
////                })
////                .catch(function (data) {
////                    alert("error");
////                });
//    };

    $scope.uploadFile = function () {
        var file = $scope.myFile;

        $log.log('file is ');
        $log.log(file);

        var uploadUrl = "http://localhost:8080/RestComiteEtica/api/VerificaArchivo";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };


});


