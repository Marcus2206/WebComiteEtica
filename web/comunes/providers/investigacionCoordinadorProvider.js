var app=angular.module("app");

function InvestigacionCoordinadorRemoteResourceProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new InvestigacionCoordinadorRemoteResource($http,$q, _baseUrl,$log);
  }];
}

app.provider("investigacionCoordinadorRemoteResource", InvestigacionCoordinadorRemoteResourceProvider);
