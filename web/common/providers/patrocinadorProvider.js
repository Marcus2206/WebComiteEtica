var app=angular.module("app");

function PatrocinadorRRProvider() {
  var _baseUrl;
  this.setBaseUrl = function(baseUrl) {
    _baseUrl = baseUrl;
  };
  this.$get = ['$http','$q',"$log",function($http,$q,$log) {
      return new PatrocinadorRR($http,$q, _baseUrl,$log);
  }];
}

app.provider("patrocinadorRR", PatrocinadorRRProvider);