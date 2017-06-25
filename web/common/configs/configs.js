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

app.config(['baseUrl', 'coordinadorRemoteResourceProvider',
  function(baseUrl, coordinadorRemoteResourceProvider) {
    coordinadorRemoteResourceProvider.setBaseUrl(baseUrl);
  }
]);

app.config(['baseUrl', 'investigacionCoordinadorRemoteResourceProvider',
  function(baseUrl, investigacionCoordinadorRemoteResourceProvider) {
    investigacionCoordinadorRemoteResourceProvider.setBaseUrl(baseUrl);
  }
]);

app.config(['baseUrl', 'parametroRRProvider',
  function(baseUrl, parametroRRProvider) {
    parametroRRProvider.setBaseUrl(baseUrl);
  }
]);