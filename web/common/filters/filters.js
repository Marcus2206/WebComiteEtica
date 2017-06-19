/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app=angular.module("app");

app.filter('empezarDe', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});
