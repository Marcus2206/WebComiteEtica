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

app.filter("booleanToText", ['$log',function (l) {       
        function booleanToTextFilter(valor) {
            var texto='No';
            if(typeof (valor)!=="undefined"){
                if(valor==='0'){
                    texto='No';
                }else{
                    texto='Sí';
                }
            }
            return texto;
        }
        return booleanToTextFilter;
    }]);


//app.filter('filtrarParametros',function(obj,param){
//    function filterByParametro(obj) {
//    if (obj.idParametro===param) {
//        return obj;
//      } 
//    }
//    return obj.filter(filterByParametro);
//});

