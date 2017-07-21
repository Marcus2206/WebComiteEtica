var app=angular.module("app");

function CorrespondenciaFileRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new CorrespondenciaFileRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("correspondenciaFileRR", CorrespondenciaFileRRProvider);