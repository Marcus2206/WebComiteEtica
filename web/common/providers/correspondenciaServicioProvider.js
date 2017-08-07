var app=angular.module("app");

function CorrespondenciaServicioRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new CorrespondenciaServicioRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("correspondenciaServicioRR", CorrespondenciaServicioRRProvider);