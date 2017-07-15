var app = angular.module("app");

app.controller('fechaController', function ($scope) {
    $scope.fechaHoy = new Date();
});

app.directive('fileModel', ['$parse', function ($parse) {
        
        /*Código para que funcione sólo un archivo*/
//        return {
//            restrict: 'A',
//            link: function (scope, element, attrs) {
//                var model = $parse(attrs.fileModel);
//                var modelSetter = model.assign;
//
//                element.bind('change', function () {
//                    scope.$apply(function () {
//                        modelSetter(scope, element[0].files[0]);
//                    });
//                });
//            }
//        };

        /*Código para que funcione múltiples archivos*/
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var isMultiple = attrs.multiple;
                var modelSetter = model.assign;

                element.bind('change', function () {
                    var values = [];
                    angular.forEach(element[0].files, function (item) {
                        var value = {
                            // File Name 
                            name: item.name,
                            //File Size 
                            size: item.size,
                            //File URL to view 
                            url: URL.createObjectURL(item),
                            // File Input Value 
                            _file: item
                        };
                        values.push(value);
                    });
                    scope.$apply(function () {
                        if (isMultiple) {
                            modelSetter(scope, values);
                        } else {
                            modelSetter(scope, values[0]);
                        }
                    });
                });
            }
        };


    }]);

app.service('fileUpload', ['$http', '$log', function ($http, $log) {
        
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

    $scope.myFile = [];

    $scope.uploadFile = function () {
        
//        var file = $scope.myFile;
//
//        $log.log('file is ' + $scope.myFile.length);
//        $log.log(file);
//        
//        $log.log('file._file is ');
//        $log.log(file._file);
//        
//        var uploadUrl = "http://localhost:8080/RestComiteEtica/api/VerificaArchivo";
//        fileUpload.uploadFileToUrl(file._file, uploadUrl);


        /**/
        var file = $scope.myFile;
        angular.forEach(file, function (item) {
            var uploadUrl = "http://localhost:8080/RestComiteEtica/api/VerificaArchivo";
            /*el objeto file, contiene un atributo: _file, que es el que contiene el archivo, 
             * en un bucle foreach se cargan los archivos uno por uno por medio del método .uploadFileToURL
             * creado en la directiva. */
            fileUpload.uploadFileToUrl(item._file, uploadUrl);

        });
        
    };


});


