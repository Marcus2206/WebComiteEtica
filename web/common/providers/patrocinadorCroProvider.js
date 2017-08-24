var app=angular.module("app");

function PatrocinadorCroRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new PatrocinadorCroRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("patrocinadorCroRR", PatrocinadorCroRRProvider);
