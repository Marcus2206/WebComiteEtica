/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app=angular.module("app");

app.config(['baseUrl', 'investigacionRemoteResourceProvider',
  function(baseUrl, investigacionRemoteResourceProvider) {
    investigacionRemoteResourceProvider.setBaseUrl(baseUrl);
  }
]);
