var app = angular.module("app");

app.filter('empezarDe', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});

app.filter("booleanToText", ['$log', function (l) {
        function booleanToTextFilter(valor) {
            var texto = 'No';
            if (typeof (valor) !== "undefined") {
                if (typeof (valor) === "string") {
                    if ((parseInt(valor) === 0)) {
                        texto = 'NO';
                    } else if (parseInt(valor) === 1) {
                        texto = 'SI';
                    } else if (valor === "SI") {
                        texto = 'SI';
                    } else if ( valor === "NO") {
                        texto = 'NO';
                    }
                } else if (typeof (valor) === "boolean") {
                    if (!valor) {
                        texto = 'NO';
                    } else if (valor) {
                        texto = 'SI';
                    }
                } else if (typeof (valor) === "number") {
                    if (valor === 0) {
                        texto = 'NO';
                    } else if (valor === 1) {
                        texto = 'SI';
                    }
                }


            }
            return texto;
        }
        return booleanToTextFilter;
    }]);

app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

app.filter('myStrictFilter', function ($filter) {
    return function (input, predicate) {
        return $filter('filter')(input, predicate, true);
    };
});

app.filter('unique', function () {
    return function (arr, field) {
        var o = {}, i, l = arr.length, r = [];
        for (i = 0; i < l; i += 1) {
            o[arr[i][field]] = arr[i];
        }
        for (i in o) {
            r.push(o[i]);
        }
        return r;
    };
});