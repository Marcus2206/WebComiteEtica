var app=angular.module("app");

function InvestigacionRemoteResourceProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new InvestigacionRemoteResource($http,$q, _baseUrl,$log);
  }];
}

app.provider("investigacionRemoteResource", InvestigacionRemoteResourceProvider);

