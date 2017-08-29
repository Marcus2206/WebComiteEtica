var app=angular.module("app");

function CorrespondenciaRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new CorrespondenciaRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("correspondenciaRR", CorrespondenciaRRProvider);