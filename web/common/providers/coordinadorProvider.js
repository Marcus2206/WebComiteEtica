var app=angular.module("app");

function CoordinadorRemoteResourceProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new CoordinadorRemoteResource($http,$q, _baseUrl,$log);
  }];
}

app.provider("coordinadorRemoteResource", CoordinadorRemoteResourceProvider);