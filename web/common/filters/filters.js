/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
                        texto = 'No';
                    } else if (parseInt(valor) === 1) {
                        texto = 'Sí';
                    }
                } else if (typeof (valor) === "boolean") {
                    if (!valor) {
                        texto = 'No';
                    } else if (valor) {
                        texto = 'Sí';
                    }
                } else if (typeof (valor) === "number") {
                    if (valor === 0) {
                        texto = 'No';
                    } else if (valor === 1) {
                        texto = 'Sí';
                    }
                }


            }
            return texto;
        }
        return booleanToTextFilter;
    }]);

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
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

//app.filter('filtrarParametros',function(obj,param){
//    function filterByParametro(obj) {
//    if (obj.idParametro===param) {
//        return obj;
//      } 
//    }
//    return obj.filter(filterByParametro);
//});

