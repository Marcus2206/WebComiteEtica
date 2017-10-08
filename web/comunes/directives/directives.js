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
                    var values = scope.myFile;
                    angular.forEach(element[0].files, function (item) {
                        var value = {
                            // File Name 
                            name: item.name,
                            //File Size 
//                            size: item.size,
                            //File URL to view 
//                            url: URL.createObjectURL(item),
                            // File Input Value 
                            _file: item,
                            _progress: 0,
                            _progressType: 'info',
                            _correspondenciaFile: {}

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

app.directive("limitInputTo", [function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var limit = parseInt(attrs.limitInputTo);
                angular.element(elem).on("keypress", function (e) {
                    if (this.value.length === limit)
                        e.preventDefault();
                });
            }
        };
    }]);


app.directive('stExport', function ($log, ExcelB, $parse) {
    return {
        require: '^stTable',
        link: function (scope, element, attrs, ctrl) {
            element.bind('click', function () {

                var etiqueta = attrs.etiqueta;
                var idTabla = attrs.tabla;
                var model = $parse(attrs.modelo);
                var modelSetter = model.assign;

                var tablaExport = ctrl.getFilteredCollection();
                var tablaHtml = document.getElementById(idTabla);

                scope.$apply(function () {
                    modelSetter(scope, tablaExport);
                });
                
                var exportHref = ExcelB.tableToExcelB(tablaHtml, etiqueta);

                var linkElement = document.createElement('a');
                try {
                    linkElement.setAttribute('href', exportHref);
                    linkElement.setAttribute("download", etiqueta);
                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                }
            });
        }
    };

});