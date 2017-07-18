var app = angular.module("app");

app.directive('fileModel', ['$parse', function ($parse) {
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
